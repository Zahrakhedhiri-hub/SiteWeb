import { GET_ONE_USER, UPDATE_USER, PASSWORD_FOUND, PASSWORD_NOTFOUND, USER_UNMODIFIED } from '../actions/types';
import axios from 'axios';
import { tokenConfig, tokenconfig } from './authActions'
import { returnErrors } from './errActions'


export const getOneUser = (id) => dispatch => {
    axios.get(`http://localhost:5000/user/findOne/${id}`).then(res =>
        dispatch({
            type: GET_ONE_USER,
            payload: res.data
        }))
        .catch(err => dispatch(returnErrors(err.reponse.data, err.reponse.stats)))
};
export const modifCompte = user => (dispatch, getState) => {
    axios.post('http://localhost:5000/user/modifCompte', user)
        .then(res =>
            dispatch({
                type: UPDATE_USER,
                payload: res.data
            }))

        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'UserUnmodified'));
            dispatch({
                type: USER_UNMODIFIED,
            })
        })
}


export const findByPW = ({ adresse_mail, mot_passe }) => dispatch => {

    //Request Body
    const body = ({ adresse_mail, mot_passe })

    axios.post('http://localhost:5000/user/pw', body)
        .then(res => dispatch({
            type: PASSWORD_FOUND,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'PasswordNotFound'));
            dispatch({
                type: PASSWORD_NOTFOUND,
            })
        })
}