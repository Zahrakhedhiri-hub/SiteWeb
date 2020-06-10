const Joi = require('joi');
const _ = require('lodash');
const {
    Fournisseur,
    fournisseur_validator,
    fournisseur_validator_update,
    id_validator
} = require('../models/fournisseur')
module.exports = {
    listF: async (req, res, next) => {

        try {
            const Fournisseurs = await Fournisseur.find();
            res.status(200).json(Fournisseurs);

        }
        catch (err) {
            next(err);


        }


    },
    addF: async (req, res, next) => {
        try {
            const NewFournisseur = new Fournisseur(req.body);
            const four = await NewFournisseur.save();
            res.status(201).json(four);
        } catch (err) {
            next(err);

        }

    },
    //////////////////Suppression
    findF: async (req, res, next) => {
        try {
            var valid_id = Joi.validate(req.params, id_validator);
            if (valid_id.error)
                return res.status(400).send(valid_id.error.details[0].message);
            var four = await Fournisseur.findById(req.params.id);
            if (!four)
                return res.status(404).send('fournisseur with this id does not exist');
            res.send(four);


        }
        catch{

        }
    },

    ///////Recherche
    deleteF: async (req, res, next) => {
        var valid_id = Joi.validate(req.params, id_validator);
        if (valid_id.error)
            return res.status(400).send(valid_id.error.details[0].message);
        var four = await Fournisseur.findByIdAndRemove(req.params.id);
        if (!four)
            return res.status(404).send('Fournisseur with this Id is missing');
        res.send(four);
    },
    updateF: async (req, res, next) => {
        /*var id_validator=Joi.validate(req.params.id, id_validator)
         if (id_validator.error)
         return res.status(400).send(id_validator.error.details[0].message)
         const old_four= await Fournisseur.findById(req.params.id);
         const four=req.body;
            four = _.merge(old_four,four); */
        var four = req.body;
        const old_four = await Fournisseur.findByIdAndUpdate(req.params.id, four); // select * from Student
        /*if (!old_four)
            return res.status(404).send('Fournisseur with this Id is missing'); */
        res.send(old_four);

    }

};