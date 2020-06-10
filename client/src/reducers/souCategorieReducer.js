import { GET_sousCATEGORIE, DELETE_sousCATEGORIE, ADD_SOUSCATEGORIE, sousCATEGORIE_LOADING, SOUCAT_FAIL } from '../actions/types';

const inialState = {
    sousCategories: [{ id: '', designation: '', categorie: '' }],
    loading: false,
    done: false,
}
export default function (state = inialState, action) {
    switch (action.type) {
        case GET_sousCATEGORIE:
            return {
                ...state,
                sousCategories: action.payload,
                loading: false
            }
        case ADD_SOUSCATEGORIE:
            return {
                ...state,
                sousCategories: [action.payload, ...state.sousCategories],
                done: true
            }
        case DELETE_sousCATEGORIE:
            return {
                ...state,
                sousCategories: state.sousCategories.filter(sousCategorie => sousCategorie._id !== action.payload)
            }
        case sousCATEGORIE_LOADING:
            return {
                ...state,
                loading: true
            }
        case SOUCAT_FAIL:
            return {
                ...state,
                done: false
            }
        default:
            return state;

    }

}