import React, {useState} from 'react';

const useForm = (initialValues, validate, setCurrentId) => {

    const [values, setValues] = useState(initialValues);
    
    const [errors, setErrors] = useState({});

    const handleInputChange = e => {
        const { name, value } = e.target;
        const fieldValue = { [name]: value };

        setValues({
            ...values,
            ...fieldValue
        })

        validate(fieldValue);
    };

    return { values, setValues, handleInputChange, errors, setErrors }
}

export default useForm
