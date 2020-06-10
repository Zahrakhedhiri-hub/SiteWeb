import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import { beginAddPhoto } from '../../actions/produitAction';
import { getCatH } from '../../actions/categorieAction';
import Accueil from '../Fournisseur/Accueil';
import { getBF } from '../../actions/boutiqueAction';


const UploadForm = ({ errors, dispatch, categories, user, match, boutiques }) => {
    const [photo, setPhoto] = useState(null);
    const [nom, setNom] = useState('');
    const [description, setDescription] = useState(null);
    const [prix, setPrix] = useState(null);
    const [nombre, setNombre] = useState(null);
    const [sousCat, setSoucat] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errorMsg, setErroMsg] = useState(null);
    const [bt, setBt] = useState(null);

    useEffect(() => {
        // setIsLoading(true);
        dispatch(getCatH());
    }, []);

    useEffect(() => {
        dispatch(getBF(match.params.id));
    }, []);
    {/* useEffect(() => {

        if (user) { console.log('id', user._id) }
        dispatch(getBF(user._id))

    }, []); */}


    useEffect(() => {
        if (categories.length > 0) {
            setIsLoading(false);
        }
    }, [categories]);
    useEffect(() => {
        setErroMsg(errors);
    }, [errors]);

    useEffect(() => {
        setErroMsg(''); // reset error message on page load
    }, []);

    const handleOnChange = (event) => {
        const file = event.target.files[0];
        setPhoto(file);
    };
    const onChangeN = (event) => {
        const nom = event.target.value;
        setNom(nom);
    };

    const onChangeP = (event) => {
        const prix = event.target.value;
        setPrix(prix);
    };
    const onChangeNbr = (event) => {
        const nombre = event.target.value;
        setNombre(nombre);
    };
    const onChangeC = (event) => {
        const sousCat = event.target.value;
        setSoucat(sousCat);
    };

    const onChangeD = (event) => {
        const description = event.target.value;
        setDescription(description);
    };
    const onChangeBt = (event) => {
        const bt = event.target.value;
        setBt(bt);
    };
    const handleFormSubmit = (event) => {
        event.preventDefault();
        if (photo) {
            const prod = {
                nom: nom,
                image: photo,
                nombre: nombre,
                prix: prix,
                sousCat: sousCat,
                description: description,
                boutique: bt
            }
            setErroMsg('');
            dispatch(beginAddPhoto(prod));
            setIsSubmitted(true);
        }
        window.location = `/produitByBoutique/${bt}`
    };

    return (

        <Fragment>
            <Accueil></Accueil>
            {errorMsg && errorMsg.upload_error ? (
                <p className="errorMsg centered-message">{errorMsg.upload_error}</p>
            ) : (
                    isSubmitted && (
                        <p className="successMsg centered-message">                                                                                                     ////////////////////
                            Produit ajouté avec succées
                        </p>
                    )                                                                                                                /////////////////////////////////////////
                )}
            <div className="content-wrapper">
                <section className="content-header">
                    <h1>
                        Ajout d'un produit

            </h1>
                    <ol className="breadcrumb">
                        <li><a href="#"><i className="fa fa-dashboard" /> Accueil</a></li>
                        <li><a href="#">Gestion de produit</a></li>
                        <li className="active">Ajout</li>
                    </ol>
                </section>
                {/* Main content */}
                <section className="content">
                    <div className="login-box-body">

                        <form onSubmit={handleFormSubmit}
                            method="post">
                            <div className="form-group has-feedback">
                                <label>Description </label>
                                <input className="form-control"
                                    type="text" name='decription'
                                    onChange={onChangeD}
                                    placeholder="Veuillez saisir la description"
                                    required
                                ></input>

                            </div>

                            <div className="form-group has-feedback">
                                <label>Nom </label>
                                <input className="form-control"
                                    type="text" name='nom'
                                    onChange={onChangeN}
                                    placeholder="Veuillez saisir le nom"
                                    required
                                ></input>
                            </div>

                            <div className="form-group has-feedback">
                                <label>Photo </label>
                                <input className="form-control"
                                    type="file" name='photo'
                                    onChange={handleOnChange}
                                    placeholder="Enter la categorie"
                                    accept="image/*"
                                ></input>
                            </div>

                            <div className="form-group has-feedback">
                                <label>Prix </label>
                                <input className="form-control"
                                    type="number" name='prix'
                                    onChange={onChangeP}
                                    placeholder="Entez le prix"
                                    required
                                ></input>
                            </div>
                            <div className="form-group has-feedback">
                                <label>Nombre de pièce </label>
                                <input className="form-control"
                                    type="number" name='quantite'
                                    onChange={onChangeNbr}
                                    placeholder="Entez la quantité"
                                    required
                                ></input>
                            </div>


                            <div className="form-group has-feedback">
                                <label>Catégorie </label>
                                <select name="sousCategorie" value={sousCat} onChange={onChangeC} multiple={false} className="form-control select2" style={{ width: '100%' }} type="select-multiple">{categories.map((sousCat, key) => {
                                    return <option key={key} value={sousCat._id} >{sousCat.description}</option>
                                })}
                                </select>
                            </div>

                            <div className="form-group has-feedback">
                                <label>Boutique </label>

                                <select name="boutique" value={bt} onChange={onChangeBt} multiple={false} type="select-multiple">{boutiques.map((bt, key) => {
                                    return <option key={key} value={bt._id} >{bt.nom}</option>
                                })}
                                </select>
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
    );
};

const mapStateToProps = (state) => ({
    //photos: state.photos || [],
    errors: state.errors || {},
    categories: state.categorie.categories || [],
    user: state.auth.user || [],
    boutiques: state.boutique.boutiques || [],
});

export default connect(mapStateToProps)(UploadForm);