import { combineReducers } from 'redux';
import fournisseurReducer from './fournisseurReducer';
import authReducer from './athReducer';
import errReducer from './errReducer';
import categorieReducer from './categorieReducer'
import photosReducer from './produitReducer';
import userReducer from './userReducer'
import boutiqueReducer from './boutiqueReducer';
import sousCategorieReducer from './souCategorieReducer'
export default combineReducers({
    ///hedhom on les utilise fel les vue nekhdhouhom m state
    fournisseur: fournisseurReducer,
    auth: authReducer,
    error: errReducer,
    categorie: categorieReducer,
    photos: photosReducer,
    user: userReducer,
    boutique: boutiqueReducer,
    sousCategorie: sousCategorieReducer

})
//lpage hedhii pr regrouper tt les reducer