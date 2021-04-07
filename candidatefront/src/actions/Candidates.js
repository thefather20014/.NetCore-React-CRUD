import api from './api';

export const ACTION_TYPES = {
    CREATE: 'CREATE',
    READ: 'READ',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE'
};

const formatData = data => ({
    ...data,
    age: parseInt(data.age ? data.age : 0)
});

export const fetchAll = () => dispatch => {

    api.Candidate().read()
        .then(res => {
            dispatch({
                type: ACTION_TYPES.READ,
                payload: res.data
            });
        })
        .catch(err => console.log(err));
};

export const create = (data, onSuccess) => dispatch => {
    
    data = formatData(data);

    api.Candidate().create(data)
        .then(res => {
            console.log(res.data)
            dispatch({
                type: ACTION_TYPES.CREATE,
                payload: res.data
            });
            onSuccess();
        })
        .catch(err => console.log(err));
};

export const update = (id, data, onSuccess) => dispatch => {
    
    data = formatData(data);

    api.Candidate().update(id, data)
        .then(res => {
            console.log(res.data)
            dispatch({
                type: ACTION_TYPES.UPDATE,
                payload: { id, ...data }
            });
            onSuccess();
        })
        .catch(err => console.log(err));
};

export const Delete = (id, onSuccess) => dispatch => {

    api.Candidate().delete(id)
        .then(res => {
            console.log(res.data)
            dispatch({
                type: ACTION_TYPES.DELETE,
                payload: id
            });
            onSuccess();
        })
        .catch(err => console.log(err));
};