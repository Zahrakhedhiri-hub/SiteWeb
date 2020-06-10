import { Fournisseurs_Loading, GET_FOURNISSEUR, Add_FOURNISSEUR, DELETE_FOURNISSEUR, VALIDATE_FOURNISSEUR } from '../actions/types';
import axios from 'axios';
import { tokenconfig } from './authActions'
import { returnErrors } from './errActions'


export const getFour = () => dispatch => {
    dispatch(setFournisseurLoading());
    axios.get('http://localhost:5000/user/fournisseurValidation').then(res =>
        dispatch({
            type: GET_FOURNISSEUR,
            payload: res.data
        }))
        .catch(err => dispatch(returnErrors(err.reponse.data, err.reponse.stats)))
};

export const deleteFour = (id) => (dispatch) => {
    axios.delete(`http://localhost:5000/user/deleteNew/${id}`)
        .then(res =>
            dispatch({
                type: DELETE_FOURNISSEUR,
                payload: id
            }))
        .catch(err => dispatch(returnErrors(err.reponse.data, err.reponse.stats)))


}
export const validateFour = (id) => (dispatch) => {
    axios.get(`http://localhost:5000/user/validerF/${id}`)
        .then(res =>
            dispatch({
                type: VALIDATE_FOURNISSEUR,
                payload: id
            }))
        .catch(err => dispatch(returnErrors(err.reponse.data, err.reponse.stats)))


}
////////////////listFournisseur Valide
export const listFournisseurValide = () => {
    return fetch(`http://localhost:5000/user/listFournisseurValide`, {
        method: "get",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",

        },
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => console.log(err));
};
/////////////////Suppression Fournisseur valide////
export const deleteFournisseurValide = (id) => {
    return fetch(`http://localhost:5000/user/deleteFournisseurValide/${id}`, {
        method: "delete",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",

        },
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => console.log(err));
};

export const addFour = fournissseur => (dispatch, getState) => {
    axios.post('http://localhost:5000/fournisseur', fournissseur, tokenconfig(getState))
        .then(res =>
            dispatch({
                type: Add_FOURNISSEUR,
                payload: res.data
            }))
}

export const setFournisseurLoading = () => {
    return {
        type: Fournisseurs_Loading


    }
}