import React, { Component, Fragment } from 'react';
import { container, ListGroup, ListGroupItem, Button, Alert } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { connect } from 'react-redux';
import { getCat, deleteCat, getOne } from '../../actions/categorieAction'
import PropTypes from 'prop-types';
import Accueil from '../Fournisseur/Accueil';


class CategoriesList extends Component {
    componentDidMount() { this.props.getCat(); }

    state = {

        msg: ''

    }
    /////////////////////
    componentDidUpdate(prevProps) {
        const { error } = this.props;
        const { categorie } = this.props;
        if (error !== prevProps.error) {
            // verifier si ya une erreur dajout
            if (error.id === 'DELETE_CATEGORIE_FAIL') {
                this.setState({ msg: error.msg.msg });

            } else {
                this.setState({ msg: null });
            }
        } if (categorie.done === true) { window.location = '/categorie/list' }

    }
    //////////////////////////////

    onDeleteClick = (id) => {
        this.props.deleteCat(id);

    }
    onUpdateClick = (id) => {
        window.location = `/categorie/update/${id}`

    }
    render() {

        const { categories } = this.props.categorie;
        return (



            <Fragment>
              
                <Accueil></Accueil>

                

                <div className="content-wrapper">
                    {/* Content Header (Page header) */}
                    <div
                        className="alert alert-danger"
                        style={{ display: this.state.msg ? "" : "none" }}
                    >
                        {this.state.msg}
                    </div>
                    <section className="content-header">
                        <h1>
                            Liste des catégories
     
                        </h1>
                        <ol className="breadcrumb">
                            <li><a href="#"><i className="fa fa-dashboard" /> Accueil</a></li>
                            <li><a href="#">Gestion categorie</a></li>
                            <li className="active">Liste des Categories</li>
                        </ol>
                    </section>
                    {/* Main content */}
                    <section className="content">
                        <div className="row">
                            <div className="col-xs-12">
                                <div className="box">
                                    <div className="box-header">
                                        <h3 className="box-title">Liste des catégories</h3>
                                    </div>
                                    {/* /.box-header */}
                                    <div className="box-body">
                                        <table id="example2" className="table table-bordered table-hover">
                                            <thead>
                                                <tr>
                                                    <th>Categorie</th>
                                                    <th>Modifier</th>
                                                    <th>Supprimer</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                {categories.map(({ _id, description }) => (

                                                    <tr>


                                                        <td>{description}</td>
                                                        <td>
                                                            <Button

                                                                color="secondary"
                                                                onClick={this.onUpdateClick.bind(this, _id)}>
                                                                &times;
                                    </Button> </td>
                                                        <td>
                                                            <Button
                                                                className="remove-btn"
                                                                color="danger"
                                                                size="md"
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
CategoriesList.propTypes = {
    //hedhi laction quon a importé
    getCat: PropTypes.func.isRequired,
    categorie: PropTypes.object.isRequired,
    error: PropTypes.object.isRequired,
}
const mapStateToProps = (state) => ({
    //state.on met le nom du reducer li hatineh fel index
    categorie: state.categorie,
    error: state.error
});
export default connect(
    mapStateToProps,
    { getCat, deleteCat })
    (CategoriesList);