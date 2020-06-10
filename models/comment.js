const mongoose = require('mongoose');
const Joi = require('joi');

var Schema = mongoose.Schema;
Joi.objectId = require('joi-objectid')(Joi);


const comment_schema = new mongoose.Schema({
    text: { type: String, required: true },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Photo'
    },
    lu: { type: Boolean, default: false }
});
const Comment = mongoose.model('Comment', comment_schema);

module.exports.Comment = Comment;





