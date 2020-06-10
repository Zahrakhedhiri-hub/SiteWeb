import axios from 'axios';
import { getErrors } from './errActions';
import { description } from 'joi';

export const beginAddPhoto = (photo) => {
    return async (dispatch) => {
        try {
            const formData = new FormData();
            formData.append('photo', photo.image);
            const nom = photo.nom
            const prix = photo.prix;
            const nombre = photo.nombre;
            const sousCat = photo.sousCat;
            const description = photo.description;
            const boutique = photo.boutique;
            formData.append('nom', nom);
            formData.append('prix', prix)
            formData.append('nombre', nombre)
            formData.append('sousCat', sousCat);
            formData.append('description', description)
            formData.append("boutique", boutique);
            await axios.post('http://localhost:5000/produit/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
        } catch (error) {
            error.response && dispatch(getErrors(error.response.data));
        }
    };
};

export const startLoadPhotos = () => {

    return async (dispatch) => {
        try {
            const photos = await axios.get('http://localhost:5000/produit/');
            console.log("voila les prod " + photos.data)
            dispatch(loadPhotos(photos.data));
        } catch (error) {
            error.response && dispatch(getErrors(error.response.data));
        }
    };
};
export const ProduitByFournisseurs = (id) => {

    return async (dispatch) => {
        try {
            const photos = await axios.get(`http://localhost:5000/produit/fournisseur/${id}`);
            console.log("voila les prod " + photos.data)
            dispatch(loadPhotos(photos.data));
        } catch (error) {
            error.response && dispatch(getErrors(error.response.data));
        }
    };
};

export const update = (id, photo) => {
    return async (dispatch) => {
        try {
            const formData = new FormData();
            formData.append('photo', photo.photo);
            console.log("*******Image*******", photo)
            const nom = photo.name
            const prix = photo.price;
            const nombre = photo.quantity;
            const sousCat = photo.categorie;
            const description = photo.description;
            formData.append('nom', nom);
            formData.append('prix', prix)
            formData.append('nombre', nombre)
            formData.append('sousCat', sousCat);
            formData.append('description', description)
            await axios.put(`http://localhost:5000/produit/update/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(response => {
                return response.json();
            })
        } catch (error) {
            error.response && dispatch(getErrors(error.response.data));
        }
    }
}


export const getOne = (id) => {
    return fetch(`http://localhost:5000/produit/findOne/${id}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",

        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


export const prodByBoutique = (id) => {
    return async (dispatch) => {
        try {
            const photos = await axios.get(`http://localhost:5000/produit/boutique/${id}`);
            dispatch(loadPhotos(photos.data));
        } catch (error) {
            error.response && dispatch(getErrors(error.response.data));
        }
    };
};
export const loadPhotos = (photos) => ({
    type: 'LOAD_PHOTOS',
    photos
});