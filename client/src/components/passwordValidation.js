import React, { Component,Fragment } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import Accueil from './Fournisseur/Accueil';
import {
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    Alert
} from 'reactstrap';
import { findByPW } from '../actions/userAction'
import { clearErrors } from '../actions/errActions';
class VerifPassword extends Component {
    componentDidUpdate(prevProps) {
        const { error } = this.props;
        const { user } = this.props;
        if (error !== prevProps.error) {
            // verifier si ya une erreur dajout
            if (error.id === 'PasswordNotFound') {
                this.setState({ msg: error.msg.msg });

            } else {
                this.setState({ msg: null });
            }
        } if (user.passwordValide === true) {
            var user1 = user.users.user;
            var id = user1._id;
            window.location = '/user/update/' + id;
        }

    }
    state = {

        adresse_mail: '',
        mot_passe: ''


    }
    static propTypes = {
        auth: PropTypes.object.isRequired,
        findByPW: PropTypes.func.isRequired,
        error: PropTypes.object.isRequired,
        clearErrors: PropTypes.func.isRequired


    }

    onSubmit = e => {
        e.preventDefault();
        const { isAuthenticated, user } = this.props.auth;
        var adresse_mail = '';
        if (user) adresse_mail = user.adresse_mail;
        console.log(adresse_mail)
        const mot_passe = this.state.mot_passe;
        const userr = {
            adresse_mail,
            mot_passe
        }
        //Ajouter une categorie via addCat action
        this.props.findByPW(userr)

        //const { error } = this.props;

        // verifier si ya une erreur denregistrement


        /* if (error.id === 'PasswordNotFound') window.location = '/gestionCompte'

        window.location = '/user/update' */
    }
    onChangeM = (e) => {
        this.setState({
            mot_passe: e.target.value,

        })

    }


    render() {
        return (


            <Fragment>
                
         <Accueil></Accueil>
            <div className="content-wrapper">
            <div
                        className="alert alert-danger"
                        style={{ display: this.state.msg ? "" : "none" }}
                    >
                        {this.state.msg}
                    </div>
                {/* Content Header (Page header) */}
                <section className="content-header">
              
                    <h1>
                     Vérification du mot de passe
      
                    </h1>
                    <ol className="breadcrumb">
                        <li><a href="#"><i className="fa fa-dashboard" /> Accueil</a></li>
                        <li><a href="#">Gestion de compte</a></li>
                        <li className="active">Verifier Mot de passe</li>
                    </ol>
                </section>
                {/* Main content */}
                <section className="content">
                    <div className="login-box-body">
                        
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group has-feedback">
                                <label>Mot de passe actuel</label>
                                <input className="form-control"
                                    type="password"
                                    name="mot_passe"
                                    placeholder="Veuillez saisir le mot de passe"
                                    onChange={this.onChangeM}></input>

                            </div>

                            <div className="row">
                                <div className="col-xs-8">

                                </div>
                                {/* /.col */}
                                <div className="col-xs-4">
                                    <button type="submit" className="btn btn-primary btn-block btn-flat">Valider</button>
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
    auth: state.auth,
    error: state.error,
    user: state.user
})
export default connect(mapStateToProps,
    { findByPW, clearErrors })//hedhi la fnct quon a importe en haut
    //houni on met le nom du fnct du componement
    (VerifPassword);