import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { NavItem } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import Logout from '../../components/logout';
import LoginModel from '../../components/LoginModel';
import { LoginRegister } from '../../components/LoginRegister'
class AccueilF extends Component {
    static propTypes = {
        auth: PropTypes.object.isRequired,

    }


    render() {
        const { isAuthenticated, user } = this.props.auth;
        var role = ''
        var isF;
        var idF;
        if (user) role = user.role;
        if (user) idF = user._id;
        if (role == 'fournisseur') isF = true;

        const FournisseurLinks = (
            <Fragment>
                <aside className="main-sidebar">
                    {/* sidebar: style can be found in sidebar.less */}
                    <section className="sidebar">
                        {/* Sidebar user panel */}
                        <div className="user-panel">
                            <div className="pull-left image">
                                <a href="#"><i className="fa fa-circle text-success" /> {user ? `Bienvenu   ${user.nom}  ` : ''}</a>
                                <Logout></Logout>
                                {/* <img src="dist/img/user2-160x160.jpg" className="img-circle" alt="User Image" /> */}
                            </div>

                        </div>
                        {/* search form */}

                        {/* /.search form */}
                        {/* sidebar menu: : s
                        
                        tyle can be found in sidebar.less */}


                        <ul className="sidebar-menu" data-widget="tree">
                            <li className="header">Menu Fournisseur</li>

                            <li className="active treeview menu-open">
                                <a href="#">
                                    <i className="fa fa-dashboard" /> <span>Gestion Boutique</span>
                                    <span className="pull-right-container">
                                        <i className="fa fa-angle-left pull-right" />
                                    </span>
                                </a>
                                <ul className="treeview-menu">

                                    <li className="active"><a href="/boutique/add"><i className="fa fa-circle-o" /> Ajout Boutique</a></li>
                                    <li><a href={'/boutique/list/' + idF}><i className="fa fa-circle-o" /> List Boutique</a></li>
                                </ul>
                            </li>
                            <li className="active treeview menu-open">
                                <a href="#">
                                    <i className="fa fa-dashboard" /> <span>Gestion Produit</span>
                                    <span className="pull-right-container">
                                        <i className="fa fa-angle-left pull-right" />
                                    </span>
                                </a>
                                <ul className="treeview-menu">
                                    <li><a href={'/uploadImage/' + idF}><i className="fa fa-circle-o" /> Ajout Produit</a></li>
                                    <li className="active"><a href={'/productt/get/' + idF}><i className="fa fa-circle-o" /> Liste Produit</a></li>
                                </ul>
                            </li>


                            <li>
                                <a href={'/orderByFournisseur/' + idF}>
                                    <i className="fa fa-th" /> <span>Gestion de commande</span>
                                    <span className="pull-right-container">

                                    </span>
                                </a>
                            </li>


                            <li>
                                <a href="/gestionCompte">
                                    <i className="fa fa-th" /> <span>Gestion de compte</span>
                                    <span className="pull-right-container">

                                    </span>
                                </a>
                            </li>


                        </ul>
                    </section>
                    {/* /.sidebar */}
                </aside>
            </Fragment>


        )


        const logLinks = (
            <LoginRegister></LoginRegister>
        )

        const AdminLinks = (
            <Fragment>
                <aside className="main-sidebar">
                    {/* sidebar: style can be found in sidebar.less */}
                    <section className="sidebar">
                        {/* Sidebar user panel */}
                        <div className="user-panel">
                            <div className="pull-left image">
                                <a href="#"><i className="fa fa-circle text-success" /> {user ? `Bienvenu   ${user.nom} ` : ''}</a>
                                <Logout></Logout>
                            </div>

                        </div>
                        {/* search form */}

                        {/* /.search form */}
                        {/* sidebar menu: : style can be found in sidebar.less */}
                        <ul className="sidebar-menu" data-widget="tree">
                            <li className="header">Menu Admin</li>
                            <li className="active treeview menu-open">
                                <a href="#">
                                    <i className="fa fa-dashboard" /> <span>Gestion Fournisseur</span>
                                    <span className="pull-right-container">
                                        <i className="fa fa-angle-left pull-right" />
                                    </span>
                                </a>
                                <ul className="treeview-menu">
                                    <li><a href="/fournisseurValidation"><i className="fa fa-circle-o" /> Validation Fournisseur</a></li>
                                    <li className="active"><a href="/listFournisseurValide"><i className="fa fa-circle-o" /> Liste Fournisseur</a></li>
                                </ul>
                            </li>
                            <li className="treeview">
                                <a href="#">
                                    <i className="fa fa-files-o" />
                                    <span>Gestion de categories</span>
                                    <span className="pull-right-container">

                                    </span>
                                </a>
                                <ul className="treeview-menu">
                                    <li><a href="/categorie/add"><i className="fa fa-circle-o" /> Ajout Categorie</a></li>
                                    <li><a href="/categorie/list"><i className="fa fa-circle-o" /> Liste Categories</a></li>

                                </ul>
                            </li>
                            <li>
                                <a href="/showAllComment">
                                    <i className="fa fa-th" /> <span>Gestion de commentaires</span>
                                    <span className="pull-right-container">

                                    </span>
                                </a>
                            </li>

                            <li>
                                <a href="/gestionCompte">
                                    <i className="fa fa-th" /> <span>Gestion de compte</span>
                                    <span className="pull-right-container">

                                    </span>
                                </a>
                            </li>


                        </ul>
                    </section>
                    {/* /.sidebar */}
                </aside>
            </Fragment>

        )




        return (


            <div className="collpase navbar-collapse" >

                {isF ? FournisseurLinks : isAuthenticated ? AdminLinks : logLinks}
            </div >

        )
    }

}

const mapStateToProps = state => ({
    auth: state.auth
})
export default connect(mapStateToProps)(AccueilF);