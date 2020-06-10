const mongoose = require("mongoose");
const crypto = require("crypto");
const uuidv1 = require("uuid/v1");
const bcrypt = require('bcryptjs');

const user_schema = new mongoose.Schema({
    nom: { type: String, required: true },
    prenom: { type: String },
    adresse_mail: { type: String, required: true },
    mot_passe: { type: String, required: true, unique: true },
    ///////////////new////////////////
    role: { type: String },
    valide: { type: Boolean }

});
/* 
user_schema
    .virtual("password")
    .set(function (password) {
        this._password = password;
        this.salt = uuidv1();
        this.hashed_password = this.encryptPassword(password);
    })
    .get(function () {
        return this._password;
    });
    */

user_schema.methods = {
    authenticate: function (plainText) {
        return this.encryptPassword(plainText) === this.hashed_password;
    },

    encryptPassword: function (password) {
        if (!password) return "";
        try {
            return crypto
                .createHmac("sha1", this.salt)
                .update(password)
                .digest("hex");
        } catch (err) {
            return "";
        }
    },
};

const User = mongoose.model('User', user_schema);
module.exports = User;
