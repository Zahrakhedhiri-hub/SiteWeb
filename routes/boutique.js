const express = require('express');
const router = express.Router();
const BoutiqueController = require('../controllers/boutique');
router.route('/')
    .post(BoutiqueController.addB)
router.route('/getBF/:id')
    .get(BoutiqueController.getBF);
router.route('/findOne/:id')
    .get(BoutiqueController.findOne)
router.route('/update/:id')
    .put(BoutiqueController.update)
module.exports = router;