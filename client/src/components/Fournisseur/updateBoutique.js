import React, { useState, useEffect ,Fragment} from 'react';
import Accueil from './Accueil';
import { Link, Redirect } from 'react-router-dom';
import { getOne, updateC } from '../../actions/boutiqueAction';

const UpdateB = ({ match }) => {
    const [values, setValues] = useState({
        nom: '',

proprietaire:'',
        error: false,
        success: false
    });


    const { nom, error, success ,proprietaire} = values;

    const init = id => {
        // console.log(userId);
        getOne(id).then(data => {
            if (data.error) {
                setValues({ ...values, error: true });
            } else {
                setValues({ ...values, nom: data.nom,proprietaire:data.proprietaire });
            }
        });
    };

    useEffect(() => {
        init(match.params.id);
    }, []);



    const handleChange = nom => e => {
        setValues({ ...values, error: false, [nom]: e.target.value });
    };

    const clickSubmit = e => {
        const id=proprietaire
        console.log("proprietaire",id)
        e.preventDefault();
        updateC(match.params.id, { nom }).then(data => {
            if (data.error) {
                // console.log(data.error);
                alert(data.error);
            } else {
                window.location = `/boutique/list/${id}`;
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
                           Ajout d'une boutique
          
                        </h1>
                        <ol className="breadcrumb">
                            <li><a href="#"><i className="fa fa-dashboard" /> Accueil</a></li>
                            <li><a href="#">Gestion de boutique</a></li>
                            <li className="active">Modification</li>
                        </ol>
                    </section>
                    {/* Main content */}
                    <section className="content">
                        <div className="login-box-body">
                            
                            <form>
                                <div className="form-group has-feedback">
                                    <label>Nom de la boutique</label>
                                    <input className="form-control"
                                        type="text"
                                        name="description"
                                        
                                        onChange={handleChange('nom')} 
                                        value={nom}></input>
    
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

export default UpdateB;
