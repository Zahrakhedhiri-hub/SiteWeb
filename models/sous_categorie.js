const mongoose = require('mongoose');
const Joi = require('joi');
const { categorie,

} = require('./categorie');

var Schema = mongoose.Schema;
Joi.objectId = require('joi-objectid')(Joi);


const sousCategorie_schema = new mongoose.Schema({
    designation: { type: String, required: true },
    categorie: {
        type: Schema.Types.ObjectId,
        ref: 'categorie'
    }

});

const sousCategorie = mongoose.model('sousCategorie', sousCategorie_schema);







// Id validator

const id_validator = {
    id: Joi.objectId().required()
}

module.exports.sousCategorie = sousCategorie;

module.exports.id_validator = id_validator;