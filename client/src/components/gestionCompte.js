import React, { useState, useEffect, Fragment } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link, Redirect } from 'react-router-dom';
import { read, update, updateUser } from '../user/apiUser';
import Accueil from './Fournisseur/Accueil';

const Update = ({ match }) => {
    const [values, setValues] = useState({
        nom: '',
        adresse_mail: '',
        mot_passe: '',
        prenom: '',

        error: false,
        success: false
    });

    const { token } = isAuthenticated();
    const { nom, adresse_mail, mot_passe, prenom, error, success } = values;

    const init = id => {
        // console.log(userId);
        read(id, token).then(data => {
            if (data.error) {
                setValues({ ...values, error: true });
            } else {
                setValues({ ...values, nom: data.nom, adresse_mail: data.adresse_mail, prenom: data.prenom });
            }
        });
    };

    useEffect(() => {
        init(match.params.id);
    }, []);

    const redirectUser = success => {
        if (success) {
            return <Redirect to="/accueilF" />;
        }
    };

    const handleChange = nom => e => {
        setValues({ ...values, error: false, [nom]: e.target.value });
    };

    const clickSubmit = e => {
        e.preventDefault();
        update(match.params.id, { nom, adresse_mail, mot_passe, prenom }).then(data => {
            if (data.error) {
                // console.log(data.error);
                alert(data.error);
            } else {
                updateUser(data, () => {
                    setValues({
                        ...values,
                        nom: data.nom,
                        adresse_mail: data.adresse_mail,
                        prenom: data.prenom,
                        success: true
                    });

                });
                window.location = '/accueilF';
            };

        });
    };

    return (

        <Fragment>
            <Accueil></Accueil>
            <div className="content-wrapper">
                <section className="content-header">
                    <h1>
                        Modifier Compte

        </h1>
                    <ol className="breadcrumb">
                        <li><a href="#"><i className="fa fa-dashboard" /> Accueil</a></li>
                        <li><a href="#">Gestion de compte</a></li>

                    </ol>
                </section>
                {/* Main content */}
                <section className="content">
                    <div className="login-box-body">

                        <form >
                            <div className="form-group has-feedback">
                                <label>Nom </label>
                                <input className="form-control"
                                    type="text"
                                    value={nom}
                                    onChange={handleChange('nom')}
                                    required
                                ></input>

                            </div>

                            <div className="form-group has-feedback">
                                <label>Prenom </label>
                                <input className="form-control"
                                    type="text"
                                    value={prenom}
                                    onChange={handleChange('prenom')}
                                    required
                                ></input>
                            </div>


                            <div className="form-group has-feedback">
                                <label>Adresse mail </label>
                                <input className="form-control"
                                    type="email"
                                    value={adresse_mail}
                                    onChange={handleChange('adresse_mail')}
                                    required
                                ></input>
                            </div>
                            <div className="form-group has-feedback">
                                <label>Mot de passe </label>
                                <input className="form-control"
                                    type="password"
                                    value={mot_passe}
                                    onChange={handleChange('mot_passe')}
                                    required
                                ></input>
                            </div>





                            <div className="row">
                                <div className="col-xs-8">

                                </div>
                                {/* /.col */}
                                <div className="col-xs-4">
                                    <button onClick={clickSubmit} className="btn btn-primary btn-block btn-flat">Valider</button>
                                </div>
                                {/* /.col */}
                            </div>
                        </form>



                    </div>

                </section>
            </div>
        </Fragment>
    );
};

export default Update;
