import { ADD_BOUTIQUE, ADD_BOUTIQUE_FAIL, GET_BOUTIQUE, DELETE_BOUTIQUE, BOUTIQUE_LOADING, ADD_CATEGORIE } from './types';
import axios from 'axios';
import { tokenConfig, tokenconfig } from './authActions'
import { returnErrors, getErrors } from './errActions';

export const getBoutique = () => dispatch => {
    dispatch(setBoutiqueLoading())
    axios.get('http:5000/boutique/').then(res =>
        dispatch({
            type: ADD_BOUTIQUE,
            payload: res.data
        }))
        //////////////////////////////////////////////////////////////////////////////////////
        //////////////////////A modifier//////////////////////////////:
        ////////////////////////////////////////////////////////////////////////////////////////////:
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'ADD_BOUTIQUE_FAIL'));
            dispatch({
                type: ADD_BOUTIQUE_FAIL
            })
        })
}
export const addBoutique = boutique => (dispatch, getState) => {
    axios.post('http://localhost:5000/boutique/', boutique, tokenconfig(getState))
        .then(res =>
            dispatch({
                type: ADD_BOUTIQUE,
                payload: res.data
            }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'ADD_BOUTIQUE_FAIL'));
            dispatch({
                type: ADD_BOUTIQUE_FAIL
            })
        })
}



export const getBF = (id) => {
    return async (dispatch) => {
        try {
            console.log("voilla id" + id);
            const boutiques = await axios.get(`http://localhost:5000/boutique/getBF/${id}`);
            console.log("voila les boutiques " + boutiques.data);
            dispatch(loadBoutique(boutiques.data));
        } catch (error) {
            error.response && dispatch(getErrors(error.response.data));
        }
    };
};
const setBoutiqueLoading = () => {
    return {
        type: 'BOUTIQUE_LOADING'
    }
}
export const loadBoutique = (boutiques) => ({
    type: GET_BOUTIQUE,
    payload: boutiques
});





export const updateC = (id, boutique) => {
    return fetch(`http://localhost:5000/boutique/update/${id}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",

        },
        body: JSON.stringify(boutique)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
export const getOne = (id) => {
    return fetch(`http://localhost:5000/boutique/findOne/${id}`, {
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