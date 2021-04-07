import { TextField, Grid, withStyles, MenuItem, FormControl, Select, InputLabel, Button, FormHelperText } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import useForm from './useForm';
import * as actions from '../actions/Candidates';
import { connect } from 'react-redux';
import { useToasts } from 'react-toast-notifications';

const initialValues = {
    fullName: '',
    mobile: '',
    email: '',
    bloodGroup: '',
    age: '',
    address: ''
};

const styles = theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            minWidth: 450
        }
    },

    formControl: {
        margin: theme.spacing(1),
        minWidth: 450
    },

    smMargin: {
        margin: theme.spacing(1)
    }
});

const CandidateForm = ({ classes, ...props }) => {

    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    const { addToast } = useToasts();

    const validate = (fieldValues = values) => {
        let temp = { ...errors };
        if ('fullName' in fieldValues)
            temp.fullName = fieldValues.fullName ? "" : "This field is required."
        if ('mobile' in fieldValues)
            temp.mobile = fieldValues.mobile ? "" : "This field is required."
        if ('bloodGroup' in fieldValues)
            temp.bloodGroup = fieldValues.bloodGroup ? "" : "This field is required."
        if ('age' in fieldValues)
            temp.age = fieldValues.age > 0 ? "" : "This field is required."
        if ('email' in fieldValues)
            temp.email = (/^$|.+@.+..+/).test(values.email) ? "" : "Email is not valid."
        if ('address' in fieldValues)
            temp.address = fieldValues.address ? "" : "This field is required."

        setErrors({ ...temp })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "");
    };

    useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    const { values, setValues, handleInputChange, errors, setErrors } = useForm(initialValues, validate, props.setCurrentId);

    const handleSubmit = e => {
        e.preventDefault();
        if (validate()) {
            if (props.currentId == 0) {
                props.createCandidate(values, () => {addToast('Submitted Successfully!', { appearance: 'success' }); reset(); props.setCurrentId(0)})
            }
            else {
                props.updateCandidate(props.currentId, values, () => {addToast('Updated Successfully!', { appearance: 'success' });  reset(); props.setCurrentId(0)})
            }

        }
    };

    useEffect(() => {
        if (props.currentId !== 0) {
            setValues({
                ...props.CandidateList.find(x => x.candidateId === props.currentId)
            })
            setErrors({});
        }
    }, [props.currentId])


    const reset = () => {
        props.fetchAllCandidates();
        setValues(initialValues);
        setErrors({});
    };


    return (
        <form onSubmit={handleSubmit} autoComplete="off" noValidate className={classes.root}>
            <Grid container>
                <Grid item xs={6}>
                    <TextField
                        name="fullName"
                        variant="outlined"
                        label="Full Name"
                        value={values.fullName}
                        onChange={handleInputChange}
                        {...(errors.fullName && { error: true, helperText: errors.fullName })} />

                    <TextField
                        name="email"
                        variant="outlined"
                        label="Email"
                        value={values.email}
                        onChange={handleInputChange}
                        {...(errors.email && { error: true, helperText: errors.email })} />

                    <FormControl
                        variant="outlined"
                        className={classes.formControl}
                        {...(errors.bloodGroup && { error: true })}
                    >

                        <InputLabel ref={inputLabel}>Blood Group</InputLabel>
                        <Select
                            name="bloodGroup"
                            value={values.bloodGroup}
                            onChange={handleInputChange}
                            labelWidth={labelWidth}
                        >

                            <MenuItem value="">Select Blood Group</MenuItem>
                            <MenuItem value="A+">A +ve</MenuItem>
                            <MenuItem value="A-">A -ve</MenuItem>
                            <MenuItem value="B+">B +ve</MenuItem>
                            <MenuItem value="B-">B -ve</MenuItem>
                            <MenuItem value="AB+">AB +ve</MenuItem>
                            <MenuItem value="AB-">AB -ve</MenuItem>
                            <MenuItem value="O+">O +ve</MenuItem>
                            <MenuItem value="O-">O -ve</MenuItem>
                        </Select>
                        {errors.bloodGroup && <FormHelperText>{errors.bloodGroup}</FormHelperText>}
                    </FormControl>
                </Grid>

                <Grid item xs={6}>
                    <TextField
                        name="mobile"
                        variant="outlined"
                        label="Mobile"
                        value={values.mobile}
                        onChange={handleInputChange}
                        {...(errors.mobile && { error: true, helperText: errors.mobile })} />

                    <TextField
                        name="age"
                        variant="outlined"
                        label="Age"
                        value={values.age}
                        type="number"
                        onChange={handleInputChange}
                        {...(errors.age && { error: true, helperText: errors.age })} />

                    <TextField
                        name="address"
                        variant="outlined"
                        label="Address"
                        value={values.address}
                        onChange={handleInputChange}
                        {...(errors.address && { error: true, helperText: errors.address })} />

                    <div>
                        <Button variant="contained" color="primary" type="submit" className={classes.smMargin}>Submit</Button>
                        <Button variant="contained" className={classes.smMargin} onClick={reset}>Reset</Button>
                    </div>
                </Grid>
            </Grid>
        </form >
    )
}


const mapStateToProps = state => ({ CandidateList: state.Candidate.list });

const mapActionsProps = { createCandidate: actions.create, updateCandidate: actions.update, fetchAllCandidates: actions.fetchAll }

export default connect(mapStateToProps, mapActionsProps)(withStyles(styles)(CandidateForm));
