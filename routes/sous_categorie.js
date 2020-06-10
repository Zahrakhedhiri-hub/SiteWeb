const express = require('express');
const Joi = require('joi');
const _ = require('lodash');
const { Categorie } = require('../models/categorie');
const Photo = require('../models/Photo');
const router = express.Router();
const {
    sousCategorie,

    id_validator
} = require('../models/sous_categorie')
//get Alll
router.get('/', async (req, res) => {
    var sousCategories = await sousCategorie.find();
    res.send(sousCategories);
});

router.delete('/', async (req, res) => {
    var sous_categorie = await sousCategorie.findById(req.params.id);
    var produit = await Photo.find({ sous_categorie });
    if (produit) return res.send({ msg: 'impossible de supprimer ce sous Categorie' })
    sousCat = await sousCategorie.findByIdAndRemove(req.params.id);
    res.send(sousCat);
})


//post new categorie
/* router.post('/', async (req, res) => {
    try {
        const cat = new Categorie(req.body.categorie);
        const id = cat.id;
        const categorie = await Categorie.findById(id);
        if (!categorie)
            return res.send('Categorie with this id does not existe');

        const newSousCat = new sousCategorie(req.body);
        const newSC = await newSousCat.save();
    }
    catch (err) {
        next(err)
    }
}); */

router.post('/', async (req, res) => {


    var cat = await Categorie.findById(req.body.categorie);


    if (!cat)
        return res.status(400).json({ msg: 'cette categorie n existe pa' });
    var designation = req.body.designation;
    console.log('designation', designation)
    var sC = await sousCategorie.findOne({ designation });
    if (sC) return res.status(400).json({ msg: 'cette sous categorie existe déja' });
    const newSousCat = new sousCategorie({
        designation: req.body.designation,
        categorie: cat
    });
    const newSC = await newSousCat.save();
    return res.send(newSC);


});


//delete
router.delete('/:id', async (req, res) => {
    var valid_id = Joi.validate(req.params, id_validator);
    if (valid_id.error)
        return res.status(400).send(valid_id.error.details[0].message);
    var sousCat = await sousCategorie.findByIdAndRemove(req.params.id); // select * from Student
    if (!sousCat)
        return res.status(400).json({ msg: 'cette sous categorie est introuvable' });
    res.send(sousCat);
});

module.exports = router;