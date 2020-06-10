import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { ProduitByFournisseurs } from '../../actions/produitAction';
import Accueil from '../Fournisseur/Accueil';
import Photo from './Photo';
import { description } from 'joi';
import { Button, Alert } from 'reactstrap';

const Gallary = ({ errors, photos, dispatch, match }) => {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        dispatch(ProduitByFournisseurs(match.params.id));
    }, []);

    useEffect(() => {
        if (photos.length > 0) {
            setIsLoading(false);
        }
    }, [photos]);
    const onUpdateClick = (id) => {
        window.location = `/produit/update/${id}`

    }
    return (

        <div className="photos-list">
            <Accueil></Accueil>
            {errors && errors.get_error && (
                <p className="errorMsg centered-message">{errors.get_error}</p>
            )}
            {isLoading ? (
                <div className="loading-msg centered-message">Loading...</div>
            ) : (<table border="">
                <th>Produit</th>
                <th>prix</th>
                <th>Nombre de pièce</th>
                <th>Photo</th>
                <th>Modifier</th>

                {photos.map(({ _id, photo, description, prix, nombre }) =>

                    <tr>
                        <td>{description}</td>
                        <td>{prix}</td>
                        <td>{nombre}</td>
                        <td>{<Photo key={_id} id={_id} />}</td>

                        <td>
                            <Button

                                color="secondary"
                                onClick={onUpdateClick.bind(this, _id)}>
                                &times;
                            </Button> </td>
                    </tr>
                )
                }</table>)}
        </div>
    );
};

const mapStateToProps = (state) => ({
    photos: state.photos || [],
    errors: state.errors || {}
});

export default connect(mapStateToProps)(Gallary);