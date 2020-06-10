import React, { Component, Fragment, useState, useEffect } from 'react';
import { container, ListGroup, ListGroupItem, Button, Alert } from 'reactstrap';
import Accueil from '../Fournisseur/Accueil'
import { showAllComments, validateComment, DeleteComment } from '../../core/apiCore'


const ListCommentaire = (dispatch) => {
    const [commentaires, setCommentaires] = useState([]);
    const [error, setError] = useState();

    const getComments = () => {
        showAllComments().then((data) => {
            if (data.msg) {
                setError(data.msg);
            } else {
                setCommentaires(data);
            }
        });
    }

    const onDeleteClick = (id) => {
        DeleteComment(id);
        window.location = '/showAllComment'

    }
    const onValidateClick = (id) => {
        validateComment(id);
        window.location = '/showAllComment'
    }
    useEffect(() => {
        getComments();
    }, []);

    useEffect(() => {
        getComments()
    }, []);



    return (

        <Fragment>
            {error ? (
                <Alert color="danger">{error}</Alert>
            ) : null}
            <Accueil></Accueil>



            <div className="content-wrapper">
                {/* Content Header (Page header) */}
                <section className="content-header">
                    <h1>
                        Liste des commentaires

                    </h1>
                    <ol className="breadcrumb">
                        <li><a href="#"><i className="fa fa-dashboard" /> Accueil</a></li>
                        <li><a href="#">Gestion de commentaire</a></li>
                        <li className="active">Liste de commentaires</li>
                    </ol>
                </section>
                {/* Main content */}
                <section className="content">
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="box">
                                <div className="box-header">
                                    <h3 className="box-title">Liste de commentaires</h3>
                                </div>
                                {/* /.box-header */}
                                <div className="box-body">
                                    <table id="example2" className="table table-bordered table-hover">
                                        <thead>
                                            <tr>
                                                <th>Commentaire</th>
                                                <th>Nom de client</th>
                                                <th>Produit</th>
                                                <th>Garder</th>
                                                <th>Supprimer</th>
                                            </tr>
                                        </thead>
                                        <tbody>


                                            {commentaires.map(({ _id, text, user, product }) => (

                                                <tr>


                                                    <td>{text}</td>
                                                    <td>{user}</td>
                                                    <td>{product}</td>

                                                    <td>
                                                        <Button
                                                            className="remove-btn"
                                                            color="danger"
                                                            size="sm"
                                                            onClick={onValidateClick.bind(this, _id)}>
                                                            &times;
                                </Button> </td>
                                                    <td>
                                                        <Button
                                                            className="remove-btn"
                                                            color="danger"
                                                            size="sm"
                                                            onClick={onDeleteClick.bind(this, _id)}>
                                                            &times;
                                </Button> </td>


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



export default ListCommentaire;
