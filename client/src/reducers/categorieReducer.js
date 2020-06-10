import { CATEGORIE_LOADING, GET_CATEGORIE, ADD_CATEGORIE, DELETE_CATEGORIE } from '../actions/types';

const inialState = {
    categories: [{ id: '', description: '' }],
    loading: false,
    done: false
}
export default function (state = inialState, action) {
    switch (action.type) {
        case GET_CATEGORIE:
            return {
                ...state,
                categories: action.payload,
                loading: false
            }
        case ADD_CATEGORIE:
            return {
                ...state,
                categories: [action.payload, ...state.categories],
                done: true
            }
        case DELETE_CATEGORIE:
            return {
                ...state,
                categories: state.categories.filter(categorie => categorie._id !== action.payload),
                done: true
            }
        case CATEGORIE_LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state;

    }

}