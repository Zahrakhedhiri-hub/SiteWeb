const Photo = require('../models/Photo');
const { Comment } = require('../models/comment')
const express = require('express');

const router = express.Router();

router.post('/', async (req, res) => {
    var com = req.body;
    var prod = req.body.product;
    var product = await Photo.findById(prod);

    if (product) {
        com.product = product;
        var comment = new Comment(com)
        await comment.save();
        console.log("Commentaire", comment);
        console.log("commentaire ajouté");
        return (res.json(comment));
    }


})
router.get('/', async (req, res) => {
    const comments = await Comment.find({ lu: false });
    if (comments.length != 0) {
        console.log("commentaire", comments);
        return res.json(comments)
    }
    else {
        console.log('pa de commentaires');

        return res.json({ msg: 'Pas de nouvelles commentaires' });
    }
})
router.get('/:idProd', async (req, res) => {
    console.log("produiiiiit", req.params.idProd);
    var product = await Photo.findById(req.params.idProd);
    console.log("le produit est", product);
    var comments = await Comment.find({ product });
    console.log("Les commentaire de ce produits", comments);
    return res.json(comments);


})
router.delete('/delete/:id', async (req, res) => {
    console.log("id commentaire", req.params.id);
    try {
        const c = await Comment.findByIdAndDelete(req.params.id);
        console.log("suppression effectué");
    } catch{ }


    res.send("suppression effectué")
})

router.get('/validate/:id', async (req, res) => {
    console.log("id commentaire", req.params.id)
    const comment = await Comment.findById(req.params.id);
    comment.lu = true;
    const c = await Comment.findByIdAndUpdate(req.params.id, comment);
    console.log("validation effectué");
    res.send("Validation effectuée");
})
module.exports = router;