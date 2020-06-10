import React, { Component, Fragment, useState, useEffect } from 'react';
import { container, ListGroup, ListGroupItem, Button, Alert } from 'reactstrap';
import Accueil from '../Fournisseur/Accueil'
import { listByFournisseurs, livreProd } from '../../core/apiCore'


const ListOrder = ({ match }) => {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState();

    const getOrders = () => {

        listByFournisseurs(match.params.id).then((data) => {
            if (data.msg) {
                setError(data.msg);
            } else {
                setOrders(data);
            }
        });
    }


    const onValidateClick = (status, id) => {
        livreProd(status, id);
        window.location = `/orderByFournisseur/${match.params.id}`
    }
    useEffect(() => {
        getOrders();
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
                        Liste des catégories

                    </h1>
                    <ol className="breadcrumb">
                        <li><a href="#"><i className="fa fa-dashboard" /> Accueil</a></li>
                        <li><a href="#">Gestion de commande</a></li>
                        <li className="active">Liste de commande</li>
                    </ol>
                </section>
                {/* Main content */}
                <section className="content">
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="box">
                                <div className="box-header">
                                    <h3 className="box-title">Liste de commande</h3>
                                </div>
                                {/* /.box-header */}
                                <div className="box-body">
                                    <table id="example2" className="table table-bordered table-hover">
                                        <thead>
                                            <tr>
                                                <th>Produit</th>
                                                <th>Quantité</th>
                                                <th>Prix</th>


                                            </tr>
                                        </thead>
                                        <tbody>


                                            {orders.map(({ _id, name, price, count, status }) => (

                                                <tr>


                                                    <td>{name}</td>
                                                    <td>{price}</td>
                                                    <td>{count}</td>

                                                    <td>
                                                        <Button

                                                            onClick={onValidateClick.bind(this, status, _id)}>
                                                            &times;
                                </Button>Livré </td>



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



export default ListOrder;
