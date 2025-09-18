const express = require('express');
const authRouter =express.Router();

const {validateSignUpData} = require('../utils/validation');
const User = require('../models/user');
const bcrypt = require('bcrypt');

authRouter.post('/signUp',async(req,res)=>{
    
    try {
        validateSignUpData(req);
        
        const {firstName,lastName,skills,password,emailId} = req.body;
        const isExisting = await User.findOne({emailId:emailId})
        if(isExisting){
            throw new Error("user already signUp");
            
        }
        const passwordHash =  await bcrypt.hash(password,10);

        const user = new User({
            firstName,
            lastName,
            skills,
            password:passwordHash,
            emailId,
        })

        await user.save();
        res.send('updated user details')

    } catch (error) {
        res.status(400).send('ERROR: '+error)
    }
})


authRouter.post('/login',async (req,res)=>{
    try {
        const {emailId,password} = req.body;
        const user = await User.findOne({emailId:emailId});
        if(!user){
            throw new Error("email id is not valid");
        }
       const isPassword = await user.validatePassword(password);
        
        if(isPassword){
           const token = await user.getJWT();

           res.cookie('token',token,{
            expires: new Date(Date.now() + 8 * 3600000)
           });

           res.send('login successfull');
        }else{
            throw new Error("password is not valid");
            
        }
    } catch (error) {
        res.status(400).send('ERROR: '+error)
    }
})


module.exports = authRouter;