const express = require('express');
const app = express();
const router = express.Router()
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const Fournisseur = require('../models/fournisseur')

router.post('/login', (req, res) => {

    const { adresse_mail, mot_passe } = req.body;
    if (!adresse_mail || !mot_passe) {
        return res.status(400).json({ msg: 'veuillez renseigner ts les champs' });
    }
    User.findOne({ adresse_mail })
        .then(user => {
            if (!user) { return res.status(400).json({ msg: 'utilisateur non existant' }); }

            //validation de mot de passe
            bcrypt.compare(mot_passe, user.mot_passe)
                .then(isMatch => {
                    if (!isMatch) return res.status(400).json({ msg: 'mot de passe incorect' })

                    jwt.sign(
                        { id: user.id },
                        config.get('jwtSecret'),
                        { expiresIn: 3600 },
                        (err, token) => {
                            if (err) throw err;

                            res.json({
                                token,
                                user: {
                                    id: user.id,
                                    nom: user.nom,
                                    prenom: user.prenom,
                                    //////////////new//////////
                                    role: user.role,
                                    valide: user.valide
                                }
                            })

                        }
                    )

                })



        })
});

/////
router.get('/user', auth, (req, res) => {
    User.findById(req.user.id)
        .select('-mot_passe')
        .then(user => res.json(user));
})


module.exports = router
