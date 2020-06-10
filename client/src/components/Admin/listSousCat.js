import React, { Component } from 'react';
import { container, ListGroup, ListGroupItem, Button, Alert } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { connect } from 'react-redux';
import { getsousCat, deletesousCat } from '../../actions/sousCategorieAction'
import PropTypes from 'prop-types';
import Accueil from '../Fournisseur/Accueil';


class listSousCat extends Component {
    componentDidMount() { this.props.getsousCat(); }

    state = {

        msg: ''

    }
    /////////////////////
    componentDidUpdate(prevProps) {
        const { error } = this.props;
        const { sousCategorie } = this.props;
        if (error !== prevProps.error) {
            // verifier si ya une erreur dajout
            if (error.id === 'DELETE_SOUSCATEGORIE_FAIL') {
                this.setState({ msg: error.msg.msg });

            } else {
                this.setState({ msg: null });
            }
        } if (sousCategorie.done === true) { window.location = '/sousCategorie/list' }

    }
    //////////////////////////////

    onDeleteClick = (id) => {
        this.props.deletesousCat(id);

    }
    render() {

        const { sousCategories } = this.props.sousCategorie;
        return (

            <container>
                <Accueil />
                {this.state.msg ? (
                    <Alert color="danger">{this.state.msg}</Alert>
                ) : null}
                <h2>Liste des sous Categorie</h2>
                <ListGroup>
                    <table className="table">
                        <TransitionGroup className="CategorieList-list">

                            <tr>
                                <th>Supprimer</th>
                                <th>sous Categorie</th>
                            </tr>

                            {sousCategories.map(({ _id, designation }) => (

                                <CSSTransition key={_id} timeout={500} classNames="fade">

                                    <ListGroupItem>
                                        <tr>
                                            <td>
                                                <Button
                                                    className="remove-btn"
                                                    color="danger"
                                                    size="sm"
                                                    onClick={this.onDeleteClick.bind(this, _id)}>
                                                    &times;
                                    </Button> </td>

                                            <td>{designation}</td>

                                        </tr>
                                    </ListGroupItem>
                                </CSSTransition>

                            ))}
                        </TransitionGroup>
                    </table>
                </ListGroup>
            </container>

        );

    }

}
listSousCat.propTypes = {
    //hedhi laction quon a importé
    getsousCat: PropTypes.func.isRequired,
    sousCategorie: PropTypes.object.isRequired,
    error: PropTypes.object.isRequired,
}
const mapStateToProps = (state) => ({
    //state.on met le nom du reducer li hatineh fel index
    sousCategorie: state.sousCategorie,
    error: state.error
});
export default connect(
    mapStateToProps,
    { getsousCat, deletesousCat })
    (listSousCat);