import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_FAIL,
    REGISTER_SUCCESS
}
    from "../actions/types"

const intialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: false,
    user: null
}

export default function (state = intialState, action) {
    switch (action.type) {
        case USER_LOADING:
            return {
                //...pr dire retourner letat courrent
                ...state,
                isLoading: true
            };
        case USER_LOADED:
            return {
                //...pr dire retourner letat courrent
                ...state,
                isLoading: false,
                isAuthenticated: true,
                user: action.payload
            };
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            localStorage.setItem('token', action.payload.token)
            return {
                //...pr dire retourner letat courrent
                ...state,
                ...action.payload,
                isLoading: false,
                isAuthenticated: true,

            };
        case LOGOUT_SUCCESS:
        case LOGIN_FAIL:
        case REGISTER_FAIL:
        case AUTH_ERROR:
            localStorage.removeItem('token');
            return {

                ...state,
                token: null,
                isAuthenticated: false,
                user: null,
                isLoading: false
            };
        default:
            return state;



    }

}