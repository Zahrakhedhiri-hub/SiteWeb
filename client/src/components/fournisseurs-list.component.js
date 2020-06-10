import React, { Component, Fragment } from 'react';
import { container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { connect } from 'react-redux';
import { getFour, deleteFour, validateFour } from '../actions/fournisseurAction'
import PropTypes from 'prop-types';
import Accueil from './Fournisseur/Accueil';

class FournisseursList extends Component {
    componentDidMount() {
        this.props.getFour();

    }


    onDeleteClick = (id) => {
        this.props.deleteFour(id);

    }
    onValidateClick = (id) => {
        this.props.validateFour(id);

    }
    render() {

        const { fournisseurs } = this.props.fournisseur;
        return (
            <Fragment>
                <Accueil></Accueil>
                <div className="content-wrapper">
                    {/* Content Header (Page header) */}
                    <section className="content-header">
                        <h1>
                            Liste des fournisseurs
      <small>advanced tables</small>
                        </h1>
                        <ol className="breadcrumb">
                            <li><a href="#"><i className="fa fa-dashboard" /> Accueil</a></li>
                            <li><a href="#">Gestion Fournisseur</a></li>
                            <li className="active">Validation</li>
                        </ol>
                    </section>
                    {/* Main content */}
                    <section className="content">
                        <div className="row">
                            <div className="col-xs-12">
                                <div className="box">
                                    <div className="box-header">
                                        <h3 className="box-title">Fournisseurs non valide</h3>
                                    </div>
                                    {/* /.box-header */}
                                    <div className="box-body">
                                        <table id="example2" className="table table-bordered table-hover">
                                            <thead>
                                                <tr>
                                                    <th>Nom</th>
                                                    <th>Prenom</th>
                                                    <th>Adresse mail</th>
                                                    <th>Supprimer</th>

                                                    <th>Valider</th>
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
                                                                className="remove-btn"
                                                                color="danger"
                                                                size="sm"
                                                                onClick={this.onDeleteClick.bind(this, _id)}>
                                                                &times;
                                    </Button> </td>

                                                        <td>
                                                            <Button
                                                                className="modify-btn"
                                                                background-color="black"
                                                                size="sm"
                                                                onClick={this.onValidateClick.bind(this, _id)}>
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

}
FournisseursList.propTypes = {
    //hedhi laction quon a importé
    getFour: PropTypes.func.isRequired,
    fournisseur: PropTypes.object.isRequired,
    validateFour: PropTypes.func.isRequired,
}
const mapStateToProps = (state) => ({
    //state.on met le nom du reducer li hatineh fel index
    fournisseur: state.fournisseur
});
export default connect(
    mapStateToProps,
    { getFour, deleteFour, validateFour })
    (FournisseursList);