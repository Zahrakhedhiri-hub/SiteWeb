const Joi = require('joi');
const _ = require('lodash');
const Photo = require('../models/Photo')

const User = require('../models/user');
const {
  Boutique,
  boutique_validator,
  boutique_validator_update
} = require('../models/boutique')

module.exports = {
  addB: async (req, res, next) => {


    /*     const prop = new Fournisseur(req.body.proprietaire);
         const id= prop.id;
        const proprietaire= await Fournisseur.findById(id);
          if (!proprietaire)
          return res.send('Provider with this id does not existe');
          if(proprietaire.valide == false)
          return res.send('you cant create a store before your account validation') */

    let nom = req.body.nom;
    let prop = req.body.proprietaire;
    let proprietaire = await User.findById(prop);
    let boutique = await Boutique.findOne({ nom, proprietaire });
    if (boutique) return res.status(400).json({ msg: 'Vous avez déja une boutique ayant ce nom' })

    const Newboutique = new Boutique(
      {
        nom: req.body.nom,
        proprietaire: proprietaire
      });
    const newB = await Newboutique.save();
    res.send(newB);
  },
  getBF: async (req, res) => {
    let prop = req.params.id;
    console.log("id user ", prop)
    let proprietaire = await User.findById(prop);
    console.log("User", proprietaire)
    let boutiques = await Boutique.find({ proprietaire });
    //console.log(boutiques);
    res.json(boutiques);
  },

  findOne: async (req, res) => {
    console.log('id', req.param)
    const boutique = await Boutique.findById(req.params.id);
    console.log('voila la boutique à modifier', boutique);
    res.json(boutique);
  },

  update: async (req, res) => {

    var old_boutique = await Boutique.findById(req.params.id);
    var bt = req.body;
    bt = _.merge(old_boutique, bt);
    old_boutique = await Boutique.findByIdAndUpdate(req.params.id, bt);
    console.log("Boutique apres modification", bt);
    var produits = await Photo.find({ boutique: bt });
    console.log("voila les produits", produits);


    res.send(bt);
  }

}