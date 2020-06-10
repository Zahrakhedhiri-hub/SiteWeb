import React, { useState, useEffect, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { getOne, update } from '../../actions/produitAction'
import { getCatH } from '../../actions/categorieAction';
import { Form, Button } from 'react-bootstrap';
import Accueil from '../Fournisseur/Accueil';
import { connect } from 'react-redux';
const UpdateP = ({ match, categories, dispatch }) => {
    const [photo, setPhoto] = useState(null);
    const [categorie, seCategorie] = useState(null)
    const [values, setValues] = useState({
        description: '',
        name: '',
        price: '',
        quantity: '',
        boutique: '',

        error: false,
        success: false
    });


    const { name, price, quantity, error, success, description, boutique } = values;

    const init = id => {
        // console.log(userId);
        getOne(id).then(data => {
            if (data.error) {
                setValues({ ...values, error: true });
            } else {
                setValues({ ...values, description: data.description, name: data.name, price: data.price, quantity: data.quantity, categorie: data.categorie, boutique: data.boutique });
            }
        });
    };


    const onChangeC = (event) => {

        const categorie = event.target.value;
        console.log("categorie******", categorie)
        seCategorie(categorie);
    };

    useEffect(() => {
        init(match.params.id);
    }, []);
    useEffect(() => {
        // setIsLoading(true);
        dispatch(getCatH());
    }, []);
    useEffect(() => {
        if (categories.length > 0) {
            //setIsLoading(false);
        }
    }, [categories]);
    const handleChange = name => e => {

        setValues({ ...values, error: false, [name]: e.target.value });
    };
    const handleOnChange = (event) => {
        const file = event.target.files[0];
        setPhoto(file);
    };
    const clickSubmit = e => {
        const id = boutique

        e.preventDefault();
        dispatch(update(match.params.id, { name, price, quantity, categorie, description, photo, boutique }));
        window.location = `/produitByBoutique/${id}`
    }

    return (
        <Fragment>
            <Accueil></Accueil>

            <div className="content-wrapper">
                <section className="content-header">
                    <h1>
                        Modifier Produit

        </h1>
                    <ol className="breadcrumb">
                        <li><a href="#"><i className="fa fa-dashboard" /> Accueil</a></li>
                        <li><a href="#">Gestion de produit</a></li>
                        <li className="active">Modification</li>
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
                                    onChange={handleChange('name')}
                                    value={name}
                                    required
                                ></input>
                            </div>
                            <div className="form-group has-feedback">
                                <label>Description </label>
                                <input className="form-control"
                                    type="text"
                                    onChange={handleChange('description')}
                                    value={description} required
                                ></input>

                            </div>



                            <div className="form-group has-feedback">
                                <label>Photo </label>
                                <input className="form-control"
                                    type="file" name='photo'
                                    onChange={handleOnChange}
                                    accept="image/*"
                                ></input>
                            </div>
                            <div className="form-group has-feedback">
                                <label>Nombre de pièce </label>
                                <input className="form-control"
                                    type="number"
                                    value={quantity}
                                    onChange={handleChange('quantity')}

                                    required
                                ></input>
                            </div>
                            <div className="form-group has-feedback">
                                <label>Prix </label>
                                <input className="form-control"
                                    type="number"
                                    onChange={handleChange('price')}
                                    value={price}
                                    required
                                ></input>
                            </div>



                            <div className="form-group has-feedback">
                                <label>Categorie</label>

                                <select name="categorie" value={categorie} onChange={onChangeC} multiple={false} type="select-multiple">{categories.map((cat, key) => {
                                    return <option key={key} value={cat._id} >{cat.description}</option>
                                })}
                                </select>
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
const mapStateToProps = (state) => ({
    //photos: state.photos || [],
    errors: state.errors || {},
    categories: state.categorie.categories || [],
    user: state.auth.user || [],
    boutiques: state.boutique.boutiques || [],
});

export default connect(mapStateToProps)(UpdateP);
