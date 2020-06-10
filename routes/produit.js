const express = require('express');
const multer = require('multer');
const Photo = require('../models/Photo');
const Router = express.Router();
const { Categorie } = require('../models/categorie');
const { Boutique } = require('../models/boutique');
const _ = require('lodash');
const User = require("../models/user");
const upload = multer({
    limits: {
        fileSize: 1000000 // max file size 1MB = 1000000 bytes
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpeg|jpg)$/)) {
            cb(new Error('only upload files with jpg or jpeg format.'));
        }
        cb(undefined, true); // continue with upload
    }
});

Router.post(
    '/',
    //upload.single('photo'),

    async (req, res) => {
        // try {
        var bt = await Boutique.findById(req.body.boutique);
        var f = bt.proprietaire;
        console.log("proprietaire du produit est", f);
        console.log("Boutique", bt);
        const categorie = req.body.sousCat
        const photo = new Photo(req.body);
        photo.name = req.body.nom;
        photo.description = req.body.description;
        photo.price = req.body.prix;
        photo.quantity = req.body.nombre;
        photo.boutique = bt;
        photo.fournisseur = f;
        const file = req.files.photo;///req.files.file
        console.log('File', file);

        photo.photo = file.data;
        //photo.photo = file.buffer;
        const cat = await Categorie.findById(categorie)
        console.log('Categorie', cat)
        photo.category = cat;
        await photo.save();
        res.status(201).send({ _id: photo._id });

        /* } catch (error) {
            res.status(500).send({
                upload_error: 'Error while uploading file...Try again later.'
            });
        }
    },
    (error, req, res, next) => {
        if (error) {
            res.status(500).send({
                upload_error: error.message
            });
        }*/
    }
);

Router.get('/', async (req, res) => {
    try {
        const photos = await Photo.find();
        console.log("les produit de back", photos);
        res.send(photos);
    } catch (error) {
        res.status(500).send({ get_error: 'Error while getting list of photos.' });
    }
});
Router.get('/boutique/:id', async (req, res) => {
    try {

        const boutique = await Boutique.findById(req.params.id)
        console.log("La boutique", boutique)
        let produits = await Photo.find({ boutique });
        console.log("les produits", produits);
        res.json(produits);
    } catch (error) {
        res.status(500).send({ get_error: 'Error while getting list of photos.' });
    }
});
////////produitByFournisseur///////
Router.get('/fournisseur/:id', async (req, res) => {
    try {
        var liste;
        const fournisseur = await User.findById(req.params.id)
        console.log("Le fournissseurs", fournisseur)
        let boutiques = await Boutique.find({ proprietaire: fournisseur });
        console.log("les boutiques", boutiques)
        await boutiques.forEach(b, async () => {
            var produits = await Photo.find({ boutique: b })
            console.log("Les produit  de ce fournisseur", produits)
            liste.push(produits);
        })
        return res.json(produits);
    } catch (error) {
        res.status(500).send({ get_error: 'Error while getting list of photos.' });
    }
});

Router.get('/findOne/:id', async (req, res) => {
    console.log('id', req.param)
    const produit = await Photo.findById(req.params.id);
    console.log('voila le produit à modifier prod', produit);
    res.json(produit);

})


////update
Router.put('/update/:id', async (req, res) => {

    var old_prod = await Photo.findById(req.params.id);
    console.log("ancien produit", old_prod)
    var photo = req.body;
    var cat = await Categorie.findById(req.body.sousCat)
    const file = req.files.photo;
    console.log("Product Body", req.body);
    photo.boutique = old_prod.boutique;
    photo.name = req.body.nom;
    photo.description = req.body.description;
    photo.price = req.body.prix;
    photo.quantity = req.body.nombre;
    photo.category = cat;
    photo.photo = file.data;
    console.log("nouveau produit", photo)
    photo = _.merge(old_prod, photo);
    console.log("produit Apres merg", photo)
    old_prod = await Photo.findByIdAndUpdate(req.params.id, photo);

    console.log("Finall Photo", photo)
    res.send(photo);
})

Router.get('/:id', async (req, res) => {
    try {
        const result = await Photo.findById(req.params.id);
        res.set('Content-Type', 'image/jpg');
        res.send(result.photo);
    } catch (error) {
        res.status(400).send({ get_error: 'Error while getting photo.' });
    }
});

module.exports = Router;