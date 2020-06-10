import React, { Component } from 'react';
import axios from 'axios';
import { loadUser } from '../actions/authActions';
import { connect } from 'react-redux';

import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';
import { addFour } from '../actions/fournisseurAction';
class CreateFournisseur extends Component {

    state = {
        //modal: false,
        nom: '',
        prenom: '',
        adresse_mail: '',
        mot_passe: ''

    }

    /*    toggle = () => {
           this.setState({
               modal: !this.state.modal
           });
       } */
    onSubmit = e => {
        e.preventDefault();

        const newFour = {

            nom: this.state.nom,
            prenom: this.state.prenom,
            adresse_mail: this.state.adresse_mail,
            mot_passe: this.state.mot_passe

        }
        //Ajouter un fournisseur via addFour action
        this.props.addFour(newFour);
        //close modal
        //this.toggle();


    }
    onChangeN = (e) => {
        this.setState({
            nom: e.target.value,

        })

    }
    onChangeP = (e) => {
        this.setState({
            prenom: e.target.value,

        })

    }
    onChangeM = (e) => {
        this.setState({
            mot_passe: e.target.value,

        })

    }
    onChangeA = (e) => {
        this.setState({
            adresse_mail: e.target.value,

        })

    }
    render() {
        return (
            <div>
                {/* <Button
                    color="dark"
                    onClick={this.toggle}>Ajouter un fournisseur</Button>

                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Ajouter un fournisseur</ModalHeader>
                    <ModalBody> */}
                <Form onSubmit={this.onSubmit}>
                    <FormGroup>
                        <Label for="four">nom</Label>
                        <input
                            type="text"
                            name="nom"
                            placeholder="Enter le nom"
                            onChange={this.onChangeN}></input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="four">prenom</Label>
                        <input
                            type="text"
                            name="prenom"
                            placeholder="Enter le prenom"
                            onChange={this.onChangeP}></input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="four">adresse_mail</Label>
                        <input
                            type="text"
                            name="adresse_mail"
                            placeholder="Enter l adresse mail"
                            onChange={this.onChangeA}></input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="four">Mot de passe</Label>
                        <input
                            type="text"
                            name="mot_passe"
                            placeholder="Enter le mot de passe"
                            onChange={this.onChangeM}></input>

                        <Button
                            block type='submit'>Ajouter fournisseur</Button>
                    </FormGroup>
                </Form>
                {/*  </ModalBody>
                </Modal> */}
            </div>


        );

    }
}
const mapStateToProps = state => ({
    fournisseur: state.fournisseur
})
export default connect(mapStateToProps, { addFour })
    //houni on met le nom du fnct du componement
    (CreateFournisseur);