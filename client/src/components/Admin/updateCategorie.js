import React, { useState, useEffect,Fragment } from 'react';
import Accueil from '../Fournisseur/Accueil';

import { Link, Redirect } from 'react-router-dom';
import { getOne, updateC } from '../../actions/categorieAction';

const UpdateCat = ({ match }) => {
    const [values, setValues] = useState({
        description: '',


        error: false,
        success: false
    });


    const { description, error, success } = values;

    const init = id => {
        // console.log(userId);
        getOne(id).then(data => {
            if (data.error) {
                setValues({ ...values, error: true });
            } else {
                setValues({ ...values, description: data.description });
            }
        });
    };

    useEffect(() => {
        init(match.params.id);
    }, []);



    const handleChange = description => e => {
        setValues({ ...values, error: false, [description]: e.target.value });
    };

    const clickSubmit = e => {
        e.preventDefault();
        updateC(match.params.id, { description }).then(data => {
            if (data.error) {
                // console.log(data.error);
                alert(data.error);
            } else {
                window.location = '/categorie/list';
            };

        });
    };

    return (
      

<Fragment>
<Accueil></Accueil>
            <div className="content-wrapper">
                {/* Content Header (Page header) */}
                <section className="content-header">
                    <h1>
                    Modification de catégorie
      
                    </h1>
                    <ol className="breadcrumb">
                        <li><a href="#"><i className="fa fa-dashboard" /> Accueil</a></li>
                        <li><a href="#">Gestion de catégorie</a></li>
                        <li className="active">Modification</li>
                    </ol>
                </section>
                {/* Main content */}
                <section className="content">
                    <div className="login-box-body">
                        
                        <form>
                            <div className="form-group has-feedback">
                                <label>Nom de la categorie</label>
                                <input className="form-control"
                                    type="text"
                                    value={description}
                                    onChange={handleChange('description')}></input>

                            </div>

                            <div className="row">
                                <div className="col-xs-8">

                                </div>
                                {/* /.col */}
                                <div className="col-xs-4">
                                    <button onClick={clickSubmit} className="btn btn-primary btn-block btn-flat">Modifier</button>
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

export default UpdateCat;
