import React, { Component, Fragment } from 'react';
import { container, ListGroup, ListGroupItem, Button, Alert } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { connect } from 'react-redux';
import { getBF } from '../../actions/boutiqueAction'
import PropTypes from 'prop-types';
import Accueil from '../Fournisseur/Accueil';


class listBoutique extends Component {
    componentWillMount() {


        this.props.getBF(this.props.match.params.id);

        console.log("pas de user")
    }

    state = {

        msg: ''

    }
    /*    /////////////////////
       componentDidUpdate(prevProps) {
           const { error } = this.props;
           const { boutique } = this.props;
           if (error !== prevProps.error) {
               // verifier si ya une erreur dajout
               if (error.id === 'DELETE_CATEGORIE_FAIL') {
                   this.setState({ msg: error.msg.msg });
   
               } else {
                   this.setState({ msg: null });
               }
           } if (categorie.done === true) { window.location = '/categorie/list' }
   
       } */
    //////////////////////////////

    onDeleteClick = (id) => {


    }
    onListClick = (id) => {
        window.location = `/produitByBoutique/${id}`

    }
    onUpdateClick = (id) => {
        window.location = `/boutique/update/${id}`

    }
    render() {

        const { boutiques } = this.props.boutique;
        return (

            <Fragment>

                <Accueil></Accueil>

                <div
                    className="alert alert-danger"
                    style={{ display: this.state.msg ? "" : "none" }}
                >
                    {this.state.msg}
                </div>

                <div className="content-wrapper">
                    {/* Content Header (Page header) */}
                    <section className="content-header">
                        <h1>
                            Liste des boutiques

                        </h1>
                        <ol className="breadcrumb">
                            <li><a href="#"><i className="fa fa-dashboard" /> Accueil</a></li>
                            <li><a href="#">Gestion de boutique</a></li>
                            <li className="active">Liste de boutiques</li>
                        </ol>
                    </section>
                    {/* Main content */}
                    <section className="content">
                        <div className="row">
                            <div className="col-xs-12">
                                <div className="box">
                                    <div className="box-header">
                                        <h3 className="box-title">Liste de boutique</h3>
                                    </div>
                                    {/* /.box-header */}
                                    <div className="box-body">
                                        <table id="example2" className="table table-bordered table-hover">
                                            <thead>
                                                <tr>
                                                    <th>Boutique</th>
                                                    <th>Liste de produits</th>
                                                    <th>Modifier</th>
                                                    <th>Supprimer</th>
                                                </tr>
                                            </thead>
                                            <tbody>


                                                {boutiques.map(({ _id, nom }) => (

                                                    <tr>


                                                        <td>{nom}</td>
                                                        <td>
                                                            <Button

                                                                onClick={this.onListClick.bind(this, _id)}>
                                                                &times;
                                    </Button> </td>

                                                        <td>
                                                            <Button

                                                                onClick={this.onUpdateClick.bind(this, _id)}>
                                                                &times;
                                    </Button> </td>

                                                        <td>
                                                            <Button
                                                                className="remove-btn"
                                                                color="danger"
                                                                size="sm"
                                                                onClick={this.onDeleteClick.bind(this, _id)}>
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
listBoutique.propTypes = {
    //hedhi laction quon a importé
    getBoutique: PropTypes.func.isRequired,
    boutique: PropTypes.object.isRequired,
    error: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}
const mapStateToProps = (state) => ({
    //state.on met le nom du reducer li hatineh fel index
    boutique: state.boutique,
    error: state.error,
    auth: state.auth,
});
export default connect(
    mapStateToProps,
    { getBF })
    (listBoutique);