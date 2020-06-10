import React, { Component } from 'react';
import axios from 'axios';
import { loadUser } from '../actions/authActions';
import { connect } from 'react-redux';
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
import { clearErrors } from '../actions/errActions'


import { register } from '../actions/authActions'
class RegisterModel extends Component {
    componentDidMount() { this.props.clearErrors() };

    state = {
        //modal: false,
        nom: '',
        prenom: '',
        adresse_mail: '',
        mot_passe: '',
        /////////////new//////////////////
        valide: false,
        role: 'fournisseur',
        msg: null,

    }
    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        register: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }

    componentDidUpdate(prevProps) {
        const { error } = this.props;
        const { auth } = this.props;
        if (error !== prevProps.error) {
            // verifier si ya une erreur denregistrement
            if (error.id === 'REGISTER_FAIL') {
                this.setState({ msg: error.msg.msg })
            } else {
                this.setState({ msg: null })
            }
        } if (auth.isAuthenticated === true) window.location = '/accueilF';

    }

    /*    toggle = () => {
           this.setState({
               modal: !this.state.modal
           });
       } */
    onSubmit = e => {
        e.preventDefault();
        const { nom, prenom, adresse_mail, mot_passe, role, valide } = this.state
        const newUser = {
            nom, prenom, adresse_mail, mot_passe, role, valide
        };
        //Attempt to register
        this.props.register(newUser);
        //close modal
        //this.toggle();



    }
    onChangeN = (e) => {
        this.setState({
            nom: e.target.value,

        })

    }
    onChangeP = (e) => {
        this.setState({
            prenom: e.target.value,

        })

    }
    onChangeA = (e) => {
        this.setState({
            adresse_mail: e.target.value,

        })

    }

    onChangeM = (e) => {
        this.setState({
            mot_passe: e.target.value,

        })

    }
    render() {
        return (
            <div>
                {/* <Button
                    color="dark"
                    onClick={this.toggle}>Ajouter un fournisseur</Button>

                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Ajouter un fournisseur</ModalHeader>
                    <ModalBody> */}
                {this.state.msg ? (
                    <Alert color="danger">{this.state.msg}</Alert>
                ) : null}



                <div>
                    <meta charSet="utf-8" />
                    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                    {/* Tell the browser to be responsive to screen width */}
                    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport" />
                    {/* Bootstrap 3.3.7 */}
                    <link rel="stylesheet" href="../../bower_components/bootstrap/dist/css/bootstrap.min.css" />
                    {/* Font Awesome */}
                    <link rel="stylesheet" href="../../bower_components/font-awesome/css/font-awesome.min.css" />
                    {/* Ionicons */}
                    <link rel="stylesheet" href="../../bower_components/Ionicons/css/ionicons.min.css" />
                    {/* Theme style */}
                    <link rel="stylesheet" href="../../dist/css/AdminLTE.min.css" />
                    {/* iCheck */}
                    <link rel="stylesheet" href="../../plugins/iCheck/square/blue.css" />
                    {/* HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries */}
                    {/* WARNING: Respond.js doesn't work if you view the page via file:// */}
                    {/*[if lt IE 9]>
  
  
  <![endif]*/}
                    {/* Google Font */}
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700,300italic,400italic,600italic" />
                    <div className="register-box">
                        <div
                            className="alert alert-danger"
                            style={{ display: this.state.msg ? "" : "none" }}
                        >
                            {this.state.msg}
                        </div>
                        <div className="register-logo">

                            <a><b>Inscription</b></a>
                        </div>
                        <div className="register-box-body">
                            <p className="login-box-msg">Page d'incription</p>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group has-feedback">
                                    <input type="text" className="form-control" name="nom"
                                        placeholder="Enter le nom"
                                        onChange={this.onChangeN}
                                        required />
                                    <span className="glyphicon glyphicon-user form-control-feedback" />
                                </div>
                                <div className="form-group has-feedback">
                                    <input type="text" className="form-control" type="text"
                                        name="prenom"
                                        placeholder="Enter le prenom"
                                        onChange={this.onChangeP}
                                        required
                                    />
                                    <span className="glyphicon glyphicon-user form-control-feedback" />
                                </div>
                                <div className="form-group has-feedback">
                                    <input type="email" className="form-control" name="adresse_mail"
                                        placeholder="Enter l adresse mail"
                                        onChange={this.onChangeA}
                                        required />
                                    <span className="glyphicon glyphicon-envelope form-control-feedback" />
                                </div>
                                <div className="form-group has-feedback">
                                    <input type="password" className="form-control" name="mot_passe"
                                        placeholder="Enter le mot de passe"
                                        onChange={this.onChangeM}
                                        required />
                                    <span className="glyphicon glyphicon-lock form-control-feedback" />
                                </div>

                                <div className="row">
                                    <div className="col-xs-8">
                                        <div className="checkbox icheck">

                                        </div>
                                    </div>
                                    {/* /.col */}
                                    <div className="col-xs-4">
                                        <button type="submit" className="btn btn-primary btn-block btn-flat">Register</button>
                                    </div>
                                    {/* /.col */}
                                </div>
                            </form>

                            <a href="/login" className="text-center">Login</a>
                        </div>
                        {/* /.form-box */}
                    </div>
                    {/* /.register-box */}
                    {/* jQuery 3 */}
                    {/* Bootstrap 3.3.7 */}
                    {/* iCheck */}
                </div>


                {/*  </ModalBody>
                </Modal> */}
            </div>


        );

    }
}
const mapStateToProps = state => ({
    auth: state.auth,
    error: state.error
})
export default connect(mapStateToProps,
    { register, clearErrors })//hedhi la fnct quon a importe en haut
    //houni on met le nom du fnct du componement
    (RegisterModel);