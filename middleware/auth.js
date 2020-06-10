const config= require('config');
const jwt =require('jsonwebtoken');

function auth(req,res , next){
const token = req.header('x-auth-token')

//check the token 
if(!token) return res.status(401).json({msg: 'No token authorization denied'});

try{
    //verify the token
    const decoded= jwt.verify(token,config.get('jwtSecret'));
    //Add user from payload pr envoyer la valeur du user qon o pris mel token fel req body 
    req.user=decoded;
    next();

}
catch(e){res.status(400).json('Token is not valid')}
}
module.exports=auth;