import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { NavItem } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import Logout from '../components/logout';
import LoginModel from './LoginModel';

class Navbar extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired
  }
  render() {
    const { isAuthenticated, user } = this.props.auth;
    const authLinks = (
      <Fragment>
        < nav className="navbar navbar-dark bg-dark navbar-expand-lg" >
          <NavItem className="navbar-text-mr3">
            <span >
              <strong> {user ? `Welcome ${user.nom}` : ''}
              </strong></span></NavItem>
          <ul className="navbar-nav mr-auto" >
            <li className="navbar-item" >
              <Link to="/get" className="nav-link" > List </Link >
            </li >
            <li className="navbar-item" >
              <Link to="/create" className="nav-link" > Ajout </Link>
            </li ></ul>
          <NavItem> <Logout /></NavItem>
        </nav>
      </Fragment>
    )

    const guestLinks = (
      <Fragment>
        <NavItem><LoginModel /></NavItem>
        {/* < Link to="/login" className="nav-link" > Log In </Link > */}
        < Link to="/register" className="nav-link" > Register </Link >

      </Fragment>

    )


    return (

      // < nav className="navbar navbar-dark bg-dark navbar-expand-lg" >
      // <Link to="/" className="navbar-brand" > </Link>
      <div className="collpase navbar-collapse" >
        {/* <ul className="navbar-nav mr-auto" >
            <li className="navbar-item" >
              <Link to="/get" className="nav-link" > List </Link >
            </li >
            <li className="navbar-item" >
              <Link to="/create" className="nav-link" > Ajout </Link>
            </li > */}
        {/* <li className="navbar-item" >
              < Link to="/register" className="nav-link" > Register </Link >
            </li > */}


        {isAuthenticated ? authLinks : guestLinks}


      </div >
      // </nav >
    )
  }

}

const mapStateToProps = state => ({
  auth: state.auth
})
export default connect(mapStateToProps, null)(Navbar);