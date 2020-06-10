import { sousCATEGORIE_LOADING, SOUCAT_FAIL, DELETE_SOUSCATEGORIE_FAIL, GET_sousCATEGORIE, ADD_SOUSCATEGORIE, DELETE_sousCATEGORIE } from '../actions/types';
import axios from 'axios';
import { tokenConfig, tokenconfig } from './authActions'
import { returnErrors, getErrors } from './errActions'


export const getsousCat = () => dispatch => {
    dispatch(setsousCategorieLoading());
    axios.get('http://localhost:5000/sousCategorie/').then(res =>
        dispatch({
            type: GET_sousCATEGORIE,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'DELETE_SousCATEGORIE_FAIL'));
            dispatch({
                type: DELETE_SOUSCATEGORIE_FAIL
            })
        })
};

export const deleteSousCat = (id) => dispatch => {
    axios.delete(`http://localhost:5000/sousCategorie/${id}`).then(res =>
        dispatch({
            type: DELETE_sousCATEGORIE,
            payload: res.data
        }))
        .catch(err => dispatch(returnErrors(err.reponse.data, err.reponse.stats)))
};

export const getSouCatH = () => {
    return async (dispatch) => {
        try {
            const sousCategories = await axios.get('http://localhost:5000/sousCategorie/');
            console.log("voila les categories " + sousCategories.data);
            dispatch(loadSousCat(sousCategories.data));
        } catch (error) {
            error.response && dispatch(getErrors(error.response.data));
        }
    };
};

export const deletesousCat = (id) => (dispatch) => {
    axios.delete(`http://localhost:5000/sousCategorie/${id}`)
        .then(res =>
            dispatch({
                type: DELETE_sousCATEGORIE,
                payload: id
            }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'SOUCAT_FAIL'));
            dispatch({
                type: SOUCAT_FAIL,
            })
        })


}


export const addsousCat = sousCategorie => (dispatch, getState) => {
    console.log('sous categorie: ', sousCategorie)
    axios.post('http://localhost:5000/sousCategorie/', sousCategorie, tokenconfig(getState))
        .then(res =>
            dispatch({
                type: ADD_SOUSCATEGORIE,
                payload: res.data
            }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'SOUCAT_FAIL'));
            dispatch({
                type: DELETE_SOUSCATEGORIE_FAIL,
            })
        })
}

export const setsousCategorieLoading = () => {
    return {
        type: sousCATEGORIE_LOADING


    }
}
export const loadSousCat = (sousCategories) => ({
    type: GET_sousCATEGORIE,
    payload: sousCategories
});