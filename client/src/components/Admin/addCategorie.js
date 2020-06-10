import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import Accueil from '../Fournisseur/Accueil';
import PropTypes from 'prop-types'

import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    Alert
} from 'reactstrap';
import { addCat } from '../../actions/categorieAction';
class addCategorie extends Component {

    state = {

        description: '',
        msg: ''

    }
    static propTypes = {
        auth: PropTypes.object.isRequired,
        error: PropTypes.object.isRequired,


    }

    onSubmit = e => {
        e.preventDefault();

        const newCat = {

            description: this.state.description,


        }
        //Ajouter une categorie via addCat action
        this.props.addCat(newCat);


    }
    onChangeC = (e) => {
        this.setState({
            description: e.target.value,

        })

    }
    componentDidUpdate(prevProps) {
        const { error } = this.props;
        const { categorie } = this.props;
        if (error !== prevProps.error) {
            // verifier si ya une erreur dajout
            if (error.id === 'ADD_CATEGORIE_FAIL') {
                this.setState({ msg: error.msg.msg });

            } else {
                this.setState({ msg: null });
            }
        } if (categorie.done === true) { window.location = '/categorie/list' }

    }

    render() {
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
                       Ajout d'une categorie
      
                    </h1>
                    <ol className="breadcrumb">
                        <li><a href="#"><i className="fa fa-dashboard" /> Accueil</a></li>
                        <li><a href="#">Gestion de catégorie</a></li>
                        <li className="active">Ajout</li>
                    </ol>
                </section>
                {/* Main content */}
                <section className="content">
                    <div className="login-box-body">
                        
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group has-feedback">
                                <label>Nom de la categorie</label>
                                <input className="form-control"
                                    type="text"
                                    name="description"
                                    placeholder="Enter la categorie"
                                    onChange={this.onChangeC}></input>

                            </div>

                            <div className="row">
                                <div className="col-xs-8">

                                </div>
                                {/* /.col */}
                                <div className="col-xs-4">
                                    <button type="submit" className="btn btn-primary btn-block btn-flat">Ajout</button>
                                </div>
                                {/* /.col */}
                            </div>
                        </form>



                    </div>

                </section>
            </div>
            </Fragment>
        );

    }
}
const mapStateToProps = state => ({
    categorie: state.categorie,
    error: state.error,
})
export default connect(mapStateToProps, { addCat })
    //houni on met le nom du fnct du componement
    (addCategorie);