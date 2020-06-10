const mongoose = require('mongoose');
const Joi = require('joi');
const User = require('./user')

var Schema = mongoose.Schema;
Joi.objectId = require('joi-objectid')(Joi);


const boutique_schema = new mongoose.Schema({
    nom: { type: String, required: true },
    proprietaire: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }

});

const Boutique = mongoose.model('Boutique', boutique_schema);

// fournisseur validator
const boutique_validator = {
    nom: Joi.string().min(3).max(20).required(),

}



const boutique_validator_update = {
    _id: Joi.objectId(),
    nom: Joi.string().min(3).max(20).required(),

}

// Id validator

const id_validator = {
    id: Joi.objectId().required()
}

module.exports.Boutique = Boutique;
module.exports.boutique_validator = boutique_validator;
module.exports.boutique_validator_update = boutique_validator_update;
module.exports.id_validator = id_validator;