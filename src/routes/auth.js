const express = require('express');
const router = express.Router();
const {validationSignUpData,validationLoginData} = require('../utils/validation');
const User = require('../models/user');
const bcrypt = require('bcrypt');

router.post('/signUP',async(req,res)=>{
     try {
        validationSignUpData(req);
     const {firstName,lastName,emailId,password,skills} = req.body;
     const isExisting = await User.findOne({emailId:emailId});
     if(isExisting){
        throw new Error("you already signUp");
     }
     const passwordHash = await bcrypt.hash(password,10); 

     const user = new User({
        firstName,
        lastName,
        emailId,
        password:passwordHash,
        skills
     })

     await user.save();
     
     res.send('updated user information');

     } catch (error) {
        res.status(400).send('ERROR: '+error);
     }
})


router.post('/login',async(req,res)=>{
try {
    validationLoginData(req);
    const {emailId,password} = req.body;
    const user = await User.findOne({emailId:emailId});
    if(!user){
        throw new Error("invalid credential");
    }
    const isPassword = await user.validatePassword(password);
    
    
    if(isPassword){
        const token = await user.getJWT();

        res.cookie('token',token,{
            expires: new Date(Date.now() + 8*3600000)
        });

        res.send('login successfull');
    }else{
        throw new Error("password is not valid");
        
    }
} catch (error) {
    res.status(400).send('ERROR: '+error);
}
})

router.post('/logout',async(req,res)=>{
    res.cookie('token',null,{
        expires:new Date(Date.now())
    });
    res.send('user logout');
})
module.exports = router;