import { CATEGORIE_LOADING, GET_CATEGORIE, ADD_CATEGORIE, DELETE_CATEGORIE, ADD_CATEGORIE_FAIL, DELETE_CATEGORIE_FAIL } from '../actions/types';
import axios from 'axios';
import { tokenConfig, tokenconfig } from './authActions'
import { returnErrors } from './errActions'
import { getErrors } from './errActions'


export const getCat = () => dispatch => {
    dispatch(setCategorieLoading());
    axios.get('http://localhost:5000/categorie/').then(res =>
        dispatch({
            type: GET_CATEGORIE,
            payload: res.data
        }))
        .catch(err => dispatch(returnErrors(err.reponse.data, err.reponse.stats)))
};

export const updateC = (id, categorie) => {
    return fetch(`http://localhost:5000/categorie/update/${id}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            // Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(categorie)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
export const getOne = (id) => {
    return fetch(`http://localhost:5000/categorie/findOne/${id}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",

        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
export const getCatH = () => {
    return async (dispatch) => {
        try {
            const categorie = await axios.get('http://localhost:5000/categorie/');
            console.log("voila les categories " + categorie.data);
            dispatch(loadCat(categorie.data));
        } catch (error) {
            error.response && dispatch(getErrors(error.response.data));
        }
    };
};
export const loadCat = (categorie) => ({
    type: GET_CATEGORIE,
    payload: categorie
});
export const deleteCat = (id) => (dispatch) => {
    axios.delete(`http://localhost:5000/categorie/${id}`)
        .then(res =>
            dispatch({
                type: DELETE_CATEGORIE,
                payload: id
            }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'DELETE_CATEGORIE_FAIL'));
            dispatch({
                type: DELETE_CATEGORIE_FAIL
            })
        })

}


export const addCat = categorie => (dispatch, getState) => {
    axios.post('http://localhost:5000/categorie/', categorie, tokenconfig(getState))
        .then(res =>
            dispatch({
                type: ADD_CATEGORIE,
                payload: res.data
            }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'ADD_CATEGORIE_FAIL'));
            dispatch({
                type: ADD_CATEGORIE_FAIL
            })
        })
}

export const setCategorieLoading = () => {
    return {
        type: CATEGORIE_LOADING


    }
}