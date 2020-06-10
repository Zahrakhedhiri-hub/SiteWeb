import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import Accueil from '../Fournisseur/Accueil';
import PropTypes from 'prop-types';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Alert
} from 'reactstrap';
import { addsousCat } from '../../actions/sousCategorieAction';
import { getCat } from '../../actions/categorieAction'
class addSousCategorie extends Component {
    componentDidMount() { this.props.getCat(); }

    componentDidUpdate(prevProps) {
        const { error } = this.props;
        const { sousCategorie } = this.props;
        if (error !== prevProps.error) {
            // verifier si ya une erreur dajout
            if (error.id === 'SOUCAT_FAIL') {
                this.setState({ msg: error.msg.msg });

            } else {
                this.setState({ msg: null });
            }
        } if (sousCategorie.done === true) { window.location = '/sousCategorie/list' }

    }

    state = {

        designation: '',
        categorie: null,
        msg: '',

    }


    onSubmit = e => {
        e.preventDefault();

        const newSousCat = {

            designation: this.state.designation,
            categorie: this.state.categorie


        }
        this.props.addsousCat(newSousCat);


    }
    onChangeD = (e) => {
        this.setState({
            designation: e.target.value,


        })

    }

    onChangeC = (e) => {
        this.setState({
            categorie: e.target.value,

        })


    }




    render() {
        const { categories } = this.props.categorie;
        return (


            <div>
                <Accueil />
                {this.state.msg ? (
                    <Alert color="danger">{this.state.msg}</Alert>
                ) : null}
                <Form onSubmit={this.onSubmit}>
                    <FormGroup>
                        <Label for="desc">Sous Categorie</Label>
                        <input
                            type="text"
                            name="designation"
                            placeholder="Enter la sous categorie"
                            onChange={this.onChangeD}></input>
                        <select name="categorie" value={this.state.abc} onChange={this.onChangeC} multiple={false} type="select-multiple">{categories.map((cat, key) => {
                            return <option key={key} value={cat._id} >{cat.description}</option>
                        })}
                        </select>

                        <Button
                            block type='submit'>Ajouter une sous categorie</Button>
                    </FormGroup>



                </Form>
            </div>


        );

    }
}
addSousCategorie.propTypes = {
    //hedhi laction quon a importé
    getCat: PropTypes.func.isRequired,
    categorie: PropTypes.object.isRequired

}
const mapStateToProps = state => ({
    categorie: state.categorie,
    sousCategorie: state.sousCategorie,
    error: state.error,

})
export default connect(mapStateToProps, { addsousCat, getCat })
    //houni on met le nom du fnct du componement
    (addSousCategorie);