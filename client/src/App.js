import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import { Provider } from 'react-redux';
import Navbar from "./components/navbar.component";
import FournisseursList from "./components/fournisseurs-list.component";
import CreateFournisseur from "./components/create-fournisseur.component.js";
import EditFournisseur from "./components/edit-fournisseur.component";
import { loadUser } from './actions/authActions';
import store from './store';
import RegisterModel from './components/RegisterModel';
import { Logout } from './components/logout';
import LoginModel from './components/LoginModel';
import AccueilF from './components/Fournisseur/Accueil';
import { NavItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { LoginRegister } from './components/LoginRegister';
import addCategorie from './components/Admin/addCategorie';
import listCategorie from './components/Admin/listCategorie';
import listSousCat from './components/Admin/listSousCat';
import listBoutique from './components/Fournisseur/listBoutique';
import addSousCategorie from './components/Admin/addSousCategorie';
import addBoutique from './components/Fournisseur/addBoutique';
import gestionCompte from './components/gestionCompte';
import UploadForm from './components/Fournisseur/UploadForm';
import passwordValidation from './components/passwordValidation'
import Gallary from './components/Fournisseur/Gallery';
import listProd from './components/Fournisseur/produitByBoutique';
import Home from '../src/core/Home';
import Product from '../src/core/Product';
import Cart from '../src/core/Cart'
import Shop from '../src/core/Shop'
import Signin from '../src/user/Signin'
import Signup from '../src/user/Signup'
import Dashboard from '../src/user/UserDashboard'
import Profile from "../src/user/Profile";
import UpdateCat from "./components/Admin/updateCategorie"
import UpdateP from "./components/Fournisseur/updateProduit"
import UpdateB from "./components/Fournisseur/updateBoutique"
import listCommentaire from "./components/Admin/listCommentaire";
import listOrdre from "./components/Fournisseur/listOrdre";
import listFournisseurValide from './components/Admin/listFournisseurValide'
class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  render() {
    return (
      <Router>
        <Provider store={store}>
          <div className="container">
            <Route path="/login" component={LoginRegister} />

            <Route path="/AccueilA" component={Navbar} />

            <Route path="/fournisseurValidation" component={FournisseursList} />
            <Route path="/register" component={RegisterModel} />
            <Route path="/create" component={CreateFournisseur} />
            <Route path="/accueilF" component={AccueilF} />
            <Route path="/categorie/add" component={addCategorie} />
            <Route path="/categorie/list" component={listCategorie} />
            <Route path="/sousCategorie/list" component={listSousCat} />
            <Route path="/sousCategorie/add" component={addSousCategorie} />
            <Route path="/boutique/add" component={addBoutique} />
            <Route path="/boutique/list/:id" component={listBoutique} />
            <Route path="/cart" exact component={Cart} />
            <Route path="/gestionCompte" component={passwordValidation} />
            <Route path="/signin" component={Signin} />
            <Route path="/signup" component={Signup} />
            <Route path="/shop" component={Shop} />
            <Route path="/uploadImage/:id" component={UploadForm} />
            <Route path="/productt/get/:id" component={Gallary} />
            <Route path="/user/update/:id" component={gestionCompte} />
            <Route path="/home" component={Home} />
            <Route path="/user/dashboard" component={Dashboard} />
            <Route path="/product/:productId" component={Product} />
            <Route path="/produitByBoutique/:id" exact component={listProd} />
            <Route path="/profile/:userId" exact component={Profile} />
            <Route path="/categorie/update/:id" exact component={UpdateCat} />
            <Route path="/produit/update/:id" exact component={UpdateP} />
            <Route path="/boutique/update/:id" exact component={UpdateB} />
            <Route path="/showAllComment" exact component={listCommentaire} />
            <Route path="/orderByFournisseur/:id" exact component={listOrdre} />
            <Route path="/listFournisseurValide" exact component={listFournisseurValide} />

          </div>
        </Provider>
      </Router>
    );
  }
}
export default App;
