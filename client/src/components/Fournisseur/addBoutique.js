import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { NavItem, Label } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import Logout from '../../components/logout';
import LoginModel from '../../components/LoginModel';
import { LoginRegister } from '../../components/LoginRegister'
import { addBoutique } from '../../actions/boutiqueAction';
import Accueil from './Accueil';
import { clearErrors } from '../../actions/errActions'

import {
   
    Alert
} from 'reactstrap';
class addBoutiquee extends Component {
    componentDidMount() { this.props.clearErrors(); }
    static propTypes = {
        auth: PropTypes.object.isRequired,
        error: PropTypes.object.isRequired,
        clearErrors: PropTypes.func.isRequired,

    }

    componentDidUpdate(prevProps) {
        const { error } = this.props;
        const { boutique } = this.props;
        const { user, isAuthenticated } = this.props.auth
        if (error !== prevProps.error) {
            // verifier si ya une erreur dajout
            if (error.id === 'ADD_BOUTIQUE_FAIL') {
                this.setState({ msg: error.msg.msg });

            } else {
                this.setState({ msg: null });
            }
        } if (boutique.added === true) {
            if (user) {
                let id = user._id;

                window.location = `/boutique/list/${id}`
            }
        }

    }

    state = {

        nom: '',
        proprietaire: '',
        msg: '',


    }


    onSubmit = (e) => {
        e.preventDefault();


        const newBoutique = {

            nom: this.state.nom,
            proprietaire: this.props.auth.user._id


        }
        //Ajouter une categorie via addCat action
        this.props.addBoutique(newBoutique);

    }
    onChangeN = (e) => {
        this.setState({
            nom: e.target.value,

        })

    }


    render() {
        const { isAuthenticated, user } = this.props.auth;

        var isV;
        if (user) isV = user.valide

        const ValideLinks = (
            <Fragment>
                
         
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
                                   Ajout d'une boutique
                  
                                </h1>
                                <ol className="breadcrumb">
                                    <li><a href="#"><i className="fa fa-dashboard" /> Accueil</a></li>
                                    <li><a href="#">Gestion de boutique</a></li>
                                    <li className="active">Ajout</li>
                                </ol>
                            </section>
                            {/* Main content */}
                            <section className="content">
                                <div className="login-box-body">
                                    
                                    <form onSubmit={this.onSubmit}>
                                        <div className="form-group has-feedback">
                                            <label>Nom de la boutique</label>
                                            <input className="form-control"
                                                type="text"
                                                name="description"
                                                placeholder="Enter le nom de la boutique"
                                                onChange={this.onChangeN}></input>
            
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
        )
        const logLinks = (
            <LoginRegister></LoginRegister>
        )
        const NonValideLinks = (
            <Fragment>
                <NavItem className="navbar-text-mr3">
                    <span >
                    
                        
                        <div
                        className="alert alert-danger"
                    >
                    Vous n'êtes pas autorisé a creer un boutique avant la validation de votre compte!
                    un mail de validation vous sera envoyé dans les meilleurs delais
                    </div>
                        </span></NavItem>



            </Fragment>

        )


        return (


            <div className="collpase navbar-collapse" >
                <Accueil></Accueil>


                {isV ? ValideLinks : isAuthenticated ? NonValideLinks : logLinks}


            </div >
            // </nav >
        )
    }

}

const mapStateToProps = state => ({
    auth: state.auth,
    error: state.error,
    boutique: state.boutique
})
export default connect(mapStateToProps, { addBoutique, clearErrors })(addBoutiquee);