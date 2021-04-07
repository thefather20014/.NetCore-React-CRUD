import { Grid, Paper, TableContainer, TableHead, TableRow, TableCell, TableBody, Table, withStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/Candidates';
import CandidateForm from './CandidateForm';
import { ButtonGroup, Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { useToasts } from 'react-toast-notifications';

const styles = theme => ({
    root: {
        "& .MuiTableCell-head": {
            fontSize: "1.25rem"
        }
    },
    paper: {
        margin: theme.spacing(2),
        padding: theme.spacing(2)
    }
});

const Candidates = ({ classes, ...props }) => {


    const { addToast } = useToasts();

    const [currentId, setCurrentId] = useState(0);

    useEffect(() => {
        props.fetchAllCandidates();
    }, [])

    const onDelete = id => {
        if (window.confirm('Are you sure you want to delete it?')) {
            props.deleteCandidate(id, () => { addToast('Deleted Successfully!', { appearance: 'info' }); props.fetchAllCandidates();})
        }
    };

    return (
        <Paper className={classes.paper} elevation={3}>
            <Grid container>
                <Grid item xs={12}>
                    <CandidateForm {...({ currentId, setCurrentId })} />
                </Grid>
                <Grid item xs={12}>
                    <TableContainer>
                        <Table>
                            <TableHead className={classes.root}>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Mobile</TableCell>
                                    <TableCell>Blood Group</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Age</TableCell>
                                    <TableCell>Address</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    props.CandidateList.map((record, index) => {
                                        return (<TableRow hover key={index}>
                                            <TableCell> {record.fullName} </TableCell>
                                            <TableCell> {record.mobile} </TableCell>
                                            <TableCell> {record.bloodGroup} </TableCell>
                                            <TableCell> {record.email} </TableCell>
                                            <TableCell> {record.age} </TableCell>
                                            <TableCell> {record.address} </TableCell>
                                            <TableCell>
                                                <ButtonGroup variant="text">
                                                    <Button><EditIcon onClick={() => { setCurrentId(record.candidateId) }} color="primary" /></Button>
                                                    <Button onClick={() => { onDelete(record.candidateId) }}><DeleteIcon color="secondary" /></Button>
                                                </ButtonGroup>
                                            </TableCell>
                                        </TableRow>)
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Paper>
    )
}

const mapStateToProps = state => ({ CandidateList: state.Candidate.list });

const mapActionsProps = { fetchAllCandidates: actions.fetchAll, deleteCandidate: actions.Delete }


export default connect(mapStateToProps, mapActionsProps)(withStyles(styles)(Candidates));
