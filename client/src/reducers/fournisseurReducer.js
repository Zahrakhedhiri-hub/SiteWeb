import { Fournisseurs_Loading, GET_FOURNISSEUR, VALIDATE_FOURNISSEUR, Add_FOURNISSEUR, DELETE_FOURNISSEUR } from '../actions/types';

const inialState = {
    fournisseurs: [{ id: '', nom: '', prenom: '', adresse_mail: '' }],
    loading: false
}
export default function (state = inialState, action) {
    switch (action.type) {
        case GET_FOURNISSEUR:
            return {
                ...state,
                fournisseurs: action.payload,
                loading: false
            }
        case Add_FOURNISSEUR:
            return {
                ...state,
                fournisseurs: [action.payload, ...state.fournisseurs]
            }
        case VALIDATE_FOURNISSEUR:
        case DELETE_FOURNISSEUR:
            return {
                ...state,
                fournisseurs: state.fournisseurs.filter(fournisseur => fournisseur._id !== action.payload)
            }
        case Fournisseurs_Loading:
            return {
                ...state,
                loading: true
            }
        default:
            return state;

    }

}