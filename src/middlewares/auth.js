const jwt = require('jsonwebtoken');
const User = require('../models/user');


const userAuth = async (req,res,next)=>{
    try {
        const {token} = req.cookies;
        
    if(!token){
        throw new Error("invalid token");
    }
    const decodedObj = await jwt.verify(token,"dev@Tinder4566");
    const {_id} = decodedObj;

    const user = await User.findById(_id);
    if(!user){
        throw new Error("invalid user");
    }
    
    req.user = user;
    next()
    } catch (error) {
       res.status(400).send('ERROR: '+error); 
    }
}

module.exports = {
    userAuth,

}