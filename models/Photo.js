
const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

const Joi = require('joi');

Joi.objectId = require('joi-objectid')(Joi);

const PhotoSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32,
    },
    description: {
        type: String,
        required: true,
        maxlength: 2000,
    },
    boutique: {
        type: ObjectId,
        ref: "Boutique",
        required: true,
    },
    price: {
        type: Number,
        trim: true,
        required: true,
        maxlength: 32,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Categorie",
        required: true,
    },
    quantity: {
        type: Number,
    },
    sold: {
        type: Number,
        default: 0,
    },
    photo: {
        type: Buffer,
        contentType: String,
    },
    fournisseur: { type: String },
    status: { type: String, default: "disponible" }

}, { timestamps: true });

/* PhotoSchema.methods.toJSON = function () {
    const result = this.toObject();
    delete result.photo;
    return result;
}; */

const Photo = mongoose.model('Photo', PhotoSchema);

module.exports = Photo;