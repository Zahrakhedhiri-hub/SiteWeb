const express = require ('express');
const app= express()
const user= require('./routes/user');
const  expressLayouts  =  require ( 'express-ejs-layouts' ) ;
const port = process.env.PORT || 5000;
//EJS
app.use(expressLayouts);
app.set('view endine', 'ejs');
app.listen(port , () => console.log(`Listening on ${port}....`));
app.get('/hii',(req,res)=>{res.json('helllllo')});
app.use('/user', user);
