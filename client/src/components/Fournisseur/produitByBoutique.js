import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { prodByBoutique } from '../../actions/produitAction';
import Accueil from '../Fournisseur/Accueil';
import Photo from './Photo';
import { description } from 'joi';
import { Label } from 'reactstrap';
import { Button, Alert } from 'reactstrap';
const ListProd = ({ errors, photos, dispatch, match }) => {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        dispatch(prodByBoutique(match.params.id));
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

        <Fragment>

            <Accueil></Accueil>



            <div className="content-wrapper">
                {/* Content Header (Page header) */}
                <section className="content-header">
                    <h1>
                        Liste de produits

                </h1>
                    <ol className="breadcrumb">
                        <li><a href="#"><i className="fa fa-dashboard" /> Accueil</a></li>
                        <li><a href="#">Gestion de produit</a></li>
                        <li className="active">Liste </li>
                    </ol>
                </section>
                {/* Main content */}
                <section className="content">
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="box">
                                <div className="box-header">
                                    <h3 className="box-title">Liste de produits</h3>
                                </div>
                                {/* /.box-header */}
                                <div className="box-body">
                                    <table id="example2" className="table table-bordered table-hover">
                                        <thead>
                                            <tr>
                                                <th>Nom</th>
                                                <th>Description</th>
                                                <th>Nombre de pièce</th>
                                                <th>prix</th>

                                                <th>Photo</th>
                                                <th>Modifier</th>
                                            </tr>
                                        </thead>
                                        <tbody>


                                            {photos.map(({ _id, photo, description, price, quantity, name }) =>

                                                <tr>
                                                    <td>{name}</td>
                                                    <td>{description}</td>
                                                    {quantity}
                                                    <td>{price}</td>

                                                    <td>{<Photo key={_id} id={_id} />}</td>
                                                    <td>
                                                        <Button

                                                            color="secondary"
                                                            onClick={onUpdateClick.bind(this, _id)}>
                                                            &times;
                            </Button> </td>
                                                </tr>
                                            )
                                            }  </tbody>

                                    </table>
                                </div>
                                {/* /.box-body */}
                            </div>



                        </div>
                        {/* /.col */}
                    </div>
                    {/* /.row */}
                </section>
                {/* /.content */}
            </div>
        </Fragment>
    );
};

const mapStateToProps = (state) => ({
    photos: state.photos || [],
    errors: state.errors || {}
});

export default connect(mapStateToProps)(ListProd);