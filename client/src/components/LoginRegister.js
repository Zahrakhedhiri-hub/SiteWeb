import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { logout } from '../actions/authActions';
import { NavLink, NavItem } from 'reactstrap';
import PropTypes from 'prop-types';
import LoginModel from '../components/LoginModel';
import RegisterModel from '../components/RegisterModel';
import { Link } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';

export class LoginRegister extends Component {


    render() {
        return (
            <Fragment>

                <NavItem>

                    <LoginModel></LoginModel></NavItem>

                <Footer></Footer>
            </Fragment>

        )

    }

}
