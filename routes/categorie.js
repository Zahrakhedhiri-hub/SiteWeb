const Photo = require('../models/Photo');
const express = require('express');
const Joi = require('joi');
const _ = require('lodash');
const auth = require('../middleware/auth');
const router = express.Router();
const {
    Categorie,
    categorie_validator,
    categorie_validator_update,
    id_validator
} = require('../models/categorie')
//get Alll
router.get('/', async (req, res) => {
    var categories = await Categorie.find();
    res.send(categories);
});


router.get('/findOne/:id', async (req, res) => {
    console.log('id', req.param)
    const categorie = await Categorie.findById(req.params.id);
    console.log('categorie à modifier', categorie);
    res.json(categorie);

})
//post new categorie
router.post('/', auth, async (req, res) => {
    var description = req.body.description;
    var cat = await Categorie.findOne({ description })
    if (cat) {
        return res.status(400).json({ msg: 'cette categorie existe déja' });
    }
    var categorie = new Categorie({
        description: req.body.description,

    });
    await categorie.save();
    res.send(categorie);

});



//delete
router.delete('/:id', async (req, res) => {
    var categorie = await Categorie.findById(req.params.id);
    console.log("id du categorie", req.params.id);
    console.log("****categorie", categorie);
    var produit = await Photo.findOne({ category: categorie });
    if (produit) {
        console.log('ON pe pa l effacer')
        return res.status(400).json({ msg: 'Plusieurs Produit appartiennent à cette categorie elle peut pa être supprimé' })
    }
    categorie = await Categorie.findByIdAndRemove(req.params.id); // select * from Student
    if (!categorie)
        return res.status(404).send({ msg: 'Categorie introuvale' });
    res.send(categorie);
});

////update
router.put('/update/:id', async (req, res) => {

    var old_cat = await Categorie.findById(req.params.id);
    var cat = req.body;
    cat = _.merge(old_cat, cat);
    old_cat = await Categorie.findByIdAndUpdate(req.params.id, cat);
    console.log("Finall categorie", cat);
    var produits = await Photo.find({ category: old_cat });
    console.log("voila les produits", produits);


    res.send(cat);
})
module.exports = router;