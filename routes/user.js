const express = require('express');
const app = express();
const router = express.Router()
const User = require('../models/user');
const { Order, CartItem } = require("../models/order");
const { Boutique } = require('../models/boutique');
const Photo = require('../models/Photo')
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const auth = require('../middleware/auth');
var nodemailer = require('nodemailer');
const { requireSignin, isAdmin, isAuth } = require("../controllers/authClient");
const { userById, read, update } = require("../controllers/user");
//////////////////with Controller//////////////

///////////send maiiiiil/////////////
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'emnakhamassiiii@gmail.com',
        pass: 'everything,12'
    }
});




//////////////////////end////////////////////
///////////////Validate fournisseur////:
router.get('/validerF/:id', async (req, res) => {
    var new_four = await User.findById(req.params.id);
    new_four.valide = true;
    new_four = await User.findByIdAndUpdate(req.params.id, new_four)
    console.log("adresse maill", new_four.adresse_mail)

    var mailOptions = {
        from: 'emnakhamassiiii@gmail.com',
        to: new_four.adresse_mail,
        subject: 'Mail de validation',
        text: `Votre compte est bien valide!!
        vous pouvez à tout moment bénefificer des services offerts par notre site`
        // html: '<h1>Hi Smartherd</h1><p>Your Messsage</p>'        
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
    return res.send(new_four);
})
/////////////////suppression///
router.delete('/deleteNew/:id', async (req, res) => {

    var result = await User.findByIdAndRemove(req.params.id);
    if (!result) return res.send({ msg: 'user introuvable' });
    console.log(result);
    res.send(result);

})

//////////////get fournisseurs non valide///////////
router.get('/fournisseurValidation', async (req, res) => {

    const fournisseursV = await User.find({ valide: false });
    res.send(fournisseursV);

})

router.get('/listFournisseurValide', async (req, res) => {

    const fournisseursV = await User.find({ valide: true, role: "fournisseur" });
    res.send(fournisseursV);

})

router.delete('/deleteFournisseurValide/:id', async (req, res) => {
    const fournisseurV = await User.findById(req.params.id);
    const id = req.params.id;
    var supprime = true;
    console.log("Fournisseur à supprimer", fournisseurV);
    orders = await Order.find();
    orders.forEach(order => {
        products = order.products;
        products.forEach(product => {
            if (product.fournisseur == id && product.status == "reserve") {

                supprime = false;

            }
        })
    })
    if (supprime == true) {
        var products = await Photo.find({ fournisseur: id })
        var boutiques = await Boutique.find({ proprietaire: fournisseurV });
        console.log('produits a supprimer', products);
        console.log('Boutique à supprimer');
        if (products.length != 0 && boutiques.length != 0) {
            var deleteProd = await Photo.remove({ products });
            var deleteBoutique = await Boutique.remove({ boutiques });
        }
        var deleteUser = await User.deleteOne(fournisseurV);
        console.log('Fournisseur supprimé ainsi que ses boutiques et ses produits')
        return (res.json('suppression effectué'))

    } else {
        console.log('Fournisseur ne pe pa etre supprime')
        return (res.json({ msg: 'Ce fournisseur ne peux pa être supprimé car il possede des commandes en cours de livraison' }))
    }
})
////////////////////findOne///////////////////
router.get('/findOne/:id', async (req, res) => {
    console.log('id', req.param)
    const user = await User.findById(req.params.id);
    console.log('user', user);
    res.json(user);

})
//////////////////Update/////////////
router.post('/modifCompte', async (req, res) => {

    console.log('Id', req.body.id);
    console.log("userId", req.body.userId)
    var old_user = await User.findById(req.body.id);
    console.log('oldUser', old_user)
    var user = req.body;
    console.log("NewUser", user)
    //////////////bcrypt///////////

    const salt = await bcrypt.genSalt(10);

    // hash the password along with our new salt
    const hash = await bcrypt.hash(user.mot_passe, salt);

    // override the cleartext password with the hashed one
    user.mot_passe = hash;

    /////////////////////endbcrypt//////////////
    user = _.merge(old_user, user);
    console.log('User after merg', user)
    old_user = await User.findByIdAndUpdate(req.body.id, user);
    console.log("Finall user", old_user)
    res.send(old_user);
})

////////////////////modifClient////////
router.put('/modifClient/:userId', async (req, res) => {

    console.log('Id', req.params.userId);

    var old_user = await User.findById(req.params.userId);
    console.log('oldUser', old_user)
    var user = req.body;
    var adresse_mail = req.body.adresse_mail
    console.log("NewUser", user)
    //////////////bcrypt///////////
    if (req.body.nom === "" || req.body.mot_passe === "" || req.body.adresse_mail === "") {
        return res.status(400).json({
            error: "Veuillez renseigner tous les champs",
        });
    }

    if (adresse_mail != old_user.adresse_mail) {
        var userByMail = await User.findOne({ adresse_mail });
        if (userByMail) {
            return res.status(400).json({
                error: "Adresse mail déja utilisée",
            });
        }
    }
    const salt = await bcrypt.genSalt(10);

    // hash the password along with our new salt
    const hash = await bcrypt.hash(user.mot_passe, salt);

    // override the cleartext password with the hashed one
    user.mot_passe = hash;

    /////////////////////endbcrypt//////////////
    user = _.merge(old_user, user);
    console.log('User after merg', user)
    old_user = await User.findByIdAndUpdate(req.params.userId, user);
    console.log("Finall user", user)
    res.send(user);
})
//Register page
router.post('/register', (req, res) => {

    const { nom, prenom, adresse_mail, mot_passe, role, valide } = req.body;
    if (!nom || !prenom || !adresse_mail || !mot_passe) {
        return res.status(400).json({ msg: 'veuillez renseigner ts les champs' });
    }
    User.findOne({ adresse_mail })
        .then(user => {
            if (user) { return res.status(400).json({ msg: 'utilisateur deja existant' }); }
            const newuser = new User({
                nom,
                prenom,
                adresse_mail,
                mot_passe,
                role,
                valide
            });
            //Create salt && hash
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newuser.mot_passe, salt, (err, hash) => {
                    if (err) throw err;
                    newuser.mot_passe = hash;
                    newuser.save()
                        .then(user => {

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
                                            role: user.role,
                                            valide: user.valide
                                        }
                                    })

                                }
                            )

                        })
                })
            })


        })
});
//////////////////:findByPw///////////////////////
router.post('/pw', async (req, res) => {
    const { adresse_mail, mot_passe } = req.body;
    console.log('adr maill', adresse_mail);
    console.log('mp', mot_passe)
    const user = await User.findOne({ adresse_mail })

    var isMatch = await bcrypt.compare(mot_passe, user.mot_passe);

    if (!isMatch) { return res.status(400).json({ msg: 'mot passe incorect' }) }

    return res.send({ user })

})

module.exports = router
