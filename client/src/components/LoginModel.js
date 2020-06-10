import React, { Component } from 'react';
import axios from 'axios';
import { login } from '../actions/authActions';
import Layout from "../core/Layout";

import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import {
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    Alert
} from 'reactstrap';
import { clearErrors } from '../actions/errActions';
class LoginModel extends Component {

    state = {
        //modal: false,
        adresse_mail: '',
        mot_passe: '',
        msg: '',

    }
    static propTypes = {
        auth: PropTypes.object.isRequired,
        error: PropTypes.object.isRequired,
        login: PropTypes.func.isRequired,

        clearErrors: PropTypes.func.isRequired
    }

    componentDidUpdate(prevProps) {
        const { error } = this.props;
        const { auth } = this.props;
        if (error !== prevProps.error) {
            // verifier si ya une erreur denregistrement
            if (error.id === 'LOGIN_FAIL') {
                this.setState({ msg: error.msg.msg })
            } else {
                this.setState({ msg: null })
            }
        }
        if (auth.isAuthenticated === true) window.location = '/accueilF'

    }

    /*    toggle = () => {
           this.setState({
               modal: !this.state.modal
           });
       } */
    onSubmit = e => {
        e.preventDefault();
        const { adresse_mail, mot_passe } = this.state;
        const user = {
            adresse_mail,
            mot_passe
        }
        ///essai de login

        this.props.login(user);
        /*  const isAuthentificated = this.props.auth.isAuthentificated
         if (isAuthentificated === true) { window.location = '/accueilF' };
         window.location = '/login' */

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


                <div className="login-box">
                    <div
                        className="alert alert-danger"
                        style={{ display: this.state.msg ? "" : "none" }}
                    >
                        {this.state.msg}
                    </div>
                    <div>
                        <div className="login-logo">

                            <a href="../../index2.html"><b>Login</b></a>
                        </div>
                        {/* /.login-logo */}
                        <div className="login-box-body">
                            <p className="login-box-msg">Sign in to start your session</p>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group has-feedback">
                                    <input type="email" className="form-control"
                                        name="adresse_mail"
                                        placeholder="Enter l adresse mail"
                                        onChange={this.onChangeA}></input>

                                    <span className="glyphicon glyphicon-envelope form-control-feedback" />
                                </div>
                                <div className="form-group has-feedback">
                                    <input type="password" className="form-control"
                                        name="mot_passe"
                                        placeholder="Enter le mot de passe"
                                        onChange={this.onChangeM}
                                    />
                                    <span className="glyphicon glyphicon-lock form-control-feedback" />
                                </div>
                                <div className="row">
                                    <div className="col-xs-8">
                                        <div className="checkbox icheck">
                                            <label>
                                                <input type="checkbox" /> Remember Me
              </label>
                                        </div>
                                    </div>
                                    {/* /.col */}
                                    <div className="col-xs-4">
                                        <button type="submit" className="btn btn-primary btn-block btn-flat">Sign In</button>
                                    </div>
                                    {/* /.col */}
                                </div>
                            </form>


                            <a href="/register" className="text-center">Inscription</a>
                        </div>
                        {/* /.login-box-body */}
                    </div>
                    {/* /.login-box */}
                    {/* jQuery 3 */}
                    {/* Bootstrap 3.3.7 */}
                    {/* iCheck */}
                </div>


            </div>


        );

    }
}
const mapStateToProps = state => ({
    auth: state.auth,
    error: state.error
})
export default connect(mapStateToProps,
    { login, clearErrors })//hedhi la fnct quon a importe en haut
    //houni on met le nom du fnct du componement
    (LoginModel);