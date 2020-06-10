const connectDb = require('./db/dbConnection');
var mongoose = require('mongoose')
const appDebug = require('debug')('app:debug');
const express = require('express');
var cors = require('cors')
const logger = require('morgan');
require("dotenv").config();

const fileUpload = require('express-fileupload')
const config = require('config');
const authMdl = require('./middleware/auth');
const path = require('path');
const expressValidator = require("express-validator");

mongoose.Promise = global.Promise;

//Routes
const brainRouter = require("./routes/braintree");
const fournisseur = require('./routes/fournisseur');
const boutique = require('./routes/boutique');
const product = require('./routes/product')
const user = require('./routes/user');
const auth = require('./routes/auth');
const authClient = require('./routes/authClient')
const categorie = require('./routes/categorie');
const sousCategorie = require('./routes/sous_categorie');
const comment = require('./routes/comment');
const produit = require('./routes/produit');
const order = require('./routes/order');
const port = process.env.PORT || 5000;
connectDb(config.get('mongoUri'));

const app = express();


//Middlewares
app.use(logger('dev'));
//BodyParser Middleware
app.use(express.json());
app.use(fileUpload());
app.use(expressValidator());
app.use(cors());
//Routers

app.get('/accueil', authMdl, (req, res) => { res.json('helllllo') });
app.use('/fournisseur', fournisseur);
app.use('/boutique', boutique);
app.use('/user', user);
app.use('/auth', auth);
app.use('/categorie', categorie);
app.use('/sousCategorie', sousCategorie)
app.use('/produit', produit);
app.use('/api/product', product);
app.use('/order', order);
app.use('/braintree', brainRouter);
app.use('/comment', comment);
app.use('/authClient', authClient);
//catch 404 Errors and forward them to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});
//error handler function

app.use((err, req, res, next) => {
    const error = app.get('env') === 'development' ? err : {};
    const status = err.status || 500;

    //response to client
    res.status(status).json({
        error: {
            message: error.message
        }
    })

    //response to ourselves
    console.error(err);

})
//start the server
app.listen(port, () => appDebug(`Listening on ${port}....`));