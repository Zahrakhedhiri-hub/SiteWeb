const mongoose = require('mongoose');
const Joi = require('joi');


var Schema=mongoose.Schema;
Joi.objectId = require('joi-objectid')(Joi);


const categorie_schema = new mongoose.Schema({
    description : {type :String, required : true},
    //date_creation: {type :date, default: Date.now()},
    
});

const Categorie = mongoose.model('Categorie', categorie_schema);

// categorie validator
const categorie_validator = {
    description : Joi.string().min(3).max(20).required(),
   
}



const categorie_validator_update = {
    _id : Joi.objectId(),
    description : Joi.string().min(3).max(20).required(),
    
}

// Id validator

const id_validator = {
    id : Joi.objectId().required()
}

module.exports.Categorie = Categorie;
module.exports.categorie_validator = categorie_validator;
module.exports.categorie_validator_update = categorie_validator_update;
module.exports.id_validator = id_validator;