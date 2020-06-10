const User = require("../models/user");
const jwt = require("jsonwebtoken"); // to generate signed token
const expressJwt = require("express-jwt"); // for authorization check
const bcrypt = require('bcryptjs');
const config = require('config');
//const { errorHandler } = require("../helpers/dbErrorsHandler");

// using promise
exports.signup = (req, res) => {

    console.log("!!!!!!!!!new client1!!!!!!!!", req.body)
    const adresse_mail = req.body.email;

    const nom = req.body.name;
    const mot_passe = req.body.password
    if (!nom || !adresse_mail || !mot_passe) {
        return res.status(400).json({ msg: 'veuillez renseigner ts les champs' });
    }
    User.findOne({ adresse_mail })
        .then(user => {
            if (user) { return res.status(400).json({ msg: 'utilisateur deja existant' }); }
            const newuser = new User({
                nom,

                adresse_mail,
                mot_passe,

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
                                        // token,
                                        user
                                    })

                                }
                            )

                        })
                })
            })


        })
};


exports.signin = (req, res) => {
    const adresse_mail = req.body.email;
    const mot_passe = req.body.password;
    console.log("adrmaill", adresse_mail);
    if (!adresse_mail || !mot_passe) {
        return res.status(400).json({ msg: 'veuillez renseigner ts les champs' });
    }
    User.findOne({ adresse_mail })
        .then(user => {
            if (!user) { return res.status(400).json({ msg: 'utilisateur non existant' }) }

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
                                user
                            })

                        }
                    )

                })



        })
};

exports.signout = (req, res) => {
    res.clearCookie("t");
    res.json({ message: "Signout success" });
};
exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    userProperty: "auth",
});
exports.isAdmin = (req, res, next) => {
    if (req.profile.role === 0) {
        return res.status(403).json({
            error: "Admin resourse! Access denied",
        });
    }
    next();
};
