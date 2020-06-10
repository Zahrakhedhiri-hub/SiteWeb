import React, { Component, Fragment, useState, useEffect } from 'react';
import { container, ListGroup, ListGroupItem, Button, Alert } from 'reactstrap';
import Accueil from '../Fournisseur/Accueil'
import { listFournisseurValide, deleteFournisseurValide } from '../../actions/fournisseurAction'


const ListFournisseurValide = ({ match }) => {
    const [fournisseurs, setFournisseurs] = useState([]);
    const [error, setError] = useState();

    const getFournisseurs = () => {

        listFournisseurValide().then((data) => {
            if (data.msg) {
                setError(data.msg);
            } else {
                setFournisseurs(data);
            }
        });
    }


    const onDeleteClick = (id) => {
        deleteFournisseurValide(id).then((data) => {
            if (data.msg)
                setError(data.msg);
            else
                window.location = '/listFournisseurValide'


        });
    }
    useEffect(() => {
        getFournisseurs();
    }, []);




    return (

        <Fragment>

            <Accueil></Accueil>



            <div className="content-wrapper">
                {/* Content Header (Page header) */}
                <section className="content-header">
                    <h1>
                        Liste des Fournisseurs

                    </h1>
                    <ol className="breadcrumb">
                        <li><a href="#"><i className="fa fa-dashboard" /> Accueil</a></li>
                        <li><a href="#">Gestion de fournisseurs</a></li>
                        <li className="active">Fournisseurs valides</li>
                    </ol>
                </section>
                {/* Main content */}
                <section className="content">
                    <div
                        className="alert alert-danger"
                        style={{ display: error ? "" : "none" }}
                    >
                        {error}
                    </div>

                    <div className="row">
                        <div className="col-xs-12">
                            <div className="box">
                                <div className="box-header">
                                    <h3 className="box-title">Liste de fournisseurs valide</h3>
                                </div>
                                {/* /.box-header */}
                                <div className="box-body">
                                    <table id="example2" className="table table-bordered table-hover">
                                        <thead>
                                            <tr>
                                                <th>Nom</th>
                                                <th>Prenom</th>
                                                <th>Adresse mail</th>


                                            </tr>
                                        </thead>
                                        <tbody>


                                            {fournisseurs.map(({ _id, nom, prenom, adresse_mail }) => (

                                                <tr>


                                                    <td>{nom}</td>
                                                    <td>{prenom}</td>
                                                    <td>{adresse_mail}</td>

                                                    <td>
                                                        <Button

                                                            onClick={onDeleteClick.bind(this, _id)}>
                                                            &times;
                                </Button>Supprimer </td>



                                                </tr>



                                            ))}  </tbody>

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

}



export default ListFournisseurValide;
