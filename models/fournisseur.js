const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);



const fournisseur_schema = new mongoose.Schema({
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    adresse_mail: { type: String, required: true },
    mot_passe: { type: String },
    valide: { type: Boolean }

});

const Fournisseur = mongoose.model('Fournisseur', fournisseur_schema);

// fournisseur validator
const fournisseur_validator = {
    nom: Joi.string().min(3).max(20).required(),
    prenom: Joi.string().min(3).max(20).required(),
    adresse_mail: Joi.string().min(3).max(20).required(),
    mot_passe: Joi.string()
}



const fournisseur_validator_update = {
    _id: Joi.objectId(),
    nom: Joi.string().min(3).max(20).required(),
    prenom: Joi.string().min(3).max(20).required(),
    adresse_mail: Joi.string().min(3).max(20).required(),

}

// Id validator

const id_validator = {
    id: Joi.objectId().required()
}

module.exports.Fournisseur = Fournisseur;
module.exports.fournisseur_validator = fournisseur_validator;
module.exports.fournisseur_validator_update = fournisseur_validator_update;
module.exports.id_validator = id_validator;