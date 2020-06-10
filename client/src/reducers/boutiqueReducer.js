import { ADD_BOUTIQUE, GET_BOUTIQUE, DELETE_BOUTIQUE, BOUTIQUE_LOADING, ADD_CATEGORIE } from '../actions/types';

const initialState = {
    boutiques: [{ id: '', nom: '', proprietaire: '' }],
    loading: false,
    added: false
}
export default function boutiqueReducer(state = initialState, action) {

    switch (action.type) {
        case GET_BOUTIQUE:
            return {
                ...state,
                boutiques: action.payload
            }

        case ADD_BOUTIQUE:
            return {
                ...state,
                boutiques: [action.payload, ...state.boutiques],
                added: true
            }
        case BOUTIQUE_LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state
    }
}