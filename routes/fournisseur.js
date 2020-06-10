const express = require('express');
const router = express.Router();
const FournisseurController = require('../controllers/fournisseur');
const auth = require('../middleware/auth');

router.route('/')
    .get(FournisseurController.listF)
    .post(auth, FournisseurController.addF);
router.route('/:id')
    .get(FournisseurController.findF)
    .put(FournisseurController.updateF)
    .patch()
    .delete(FournisseurController.deleteF);




module.exports = router;

