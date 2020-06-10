import { GET_ONE_USER, UPDATE_USER, PASSWORD_FOUND, PASSWORD_NOTFOUND } from '../actions/types';

const inialState = {
    users: [{ id: '', nom: '', prenom: '', adresse_mail: '', mot_passe: '' }],
    passwordValide: false
}
export default function userReducer(state = inialState, action) {
    switch (action.type) {
        case UPDATE_USER:
        case GET_ONE_USER:
        case PASSWORD_FOUND:
            return {
                ...state,
                users: action.payload,
                passwordValide: true
            }

        case PASSWORD_NOTFOUND:
            return {
                ...state,
                passwordValide: false
            }
        default:
            return state
    }

}


