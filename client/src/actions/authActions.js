import axios from 'axios';
import { returnErrors } from './errActions'
import {
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADING,
    USER_LOADED
}
    from './types';
//verifier le token w telecharger user
export const loadUser = () => (dispatch, getState) => {
    //User loading
    dispatch({ type: USER_LOADING });


    axios
        .get('http://localhost:5000/auth/user', tokenconfig(getState))
        .then(res =>
            dispatch({
                type: USER_LOADED,
                payload: res.data
            })
        )
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: AUTH_ERROR
            });
        });

}
//Register user
export const register = ({ nom, prenom, adresse_mail, mot_passe, role, valide }) => dispatch => {

    //Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    //Request Body
    const body = JSON.stringify({ nom, prenom, adresse_mail, mot_passe, role, valide })
    axios.post('http://localhost:5000/user/register', body, config)
        .then(res => dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
            dispatch({
                type: REGISTER_FAIL
            })
        })
}
//////////LogIn///////////
export const login = ({ adresse_mail, mot_passe }) => dispatch => {

    //Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    //Request Body
    const body = JSON.stringify({ adresse_mail, mot_passe })
    axios.post('http://localhost:5000/auth/login', body, config)
        .then(res => dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));
            dispatch({
                type: LOGIN_FAIL
            })
        })
}

//////////Logout////////////
export const logout = () => {
    return {
        type: LOGOUT_SUCCESS
    }
}

//setup config/headers and token
export const tokenconfig = getState => {
    //Get token from localstorage
    const token = getState().auth.token; //hedhii elle va recuprer token mta3 initial state fel authReducer 
    // Headers
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    };
    //if token then add to headers
    if (token) {
        config.headers['x-auth-token'] = token;

    }

    return config;
}


