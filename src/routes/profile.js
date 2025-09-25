const express = require('express');
const router = express.Router();
const {userAuth} = require('../middlewares/auth');
const {validateEditProfileData,validateNewPasswordData} = require('../utils/validation');
const User = require('../models/user');
const bcrypt = require('bcrypt');


router.get('/profile/view',userAuth,async(req,res)=>{
  try {
    const user = req.user;
    res.send(user)
  } catch (error) {
    res.status(400).send('ERROR: '+error)
  }

})

router.patch('/profile/edit',userAuth,async(req,res)=>{
  try {
    if(!validateEditProfileData(req)){
       throw new Error("Invalid Edit Request");
    }
    const loggedInUser = req.user;
  
    Object.keys(req.body).forEach((key)=>loggedInUser[key] = req.body[key]);
    
    await loggedInUser.save();

    res.json({
      message:`${loggedInUser.firstName} your profile Updated`,
      data:loggedInUser,
    })

  } catch (error) {
    res.status(400).send('ERROR: '+error)
  }
})

router.patch('/profile/password',userAuth,async(req,res)=>{
  try {
    const {newPassword} = req.body; 

    if(!newPassword){
      throw new Error("Password is required");
    }

    const user = req.user;
    const passwordHash = user.password;

    if(!user){
      throw new Error("Invalid Credential");
    }

    validateNewPasswordData(newPassword);

    const isSame = await bcrypt.compare(newPassword,passwordHash)
    if(isSame){
      throw new Error("this is a old password - try new one");
    }

    user.password = await bcrypt.hash(newPassword,10)
    
    await user.save();

     res.json({
      message: `${user.firstName} - your password is updated`,
      data:user
    })

  } catch (error) {

   res.status(400).json({ error: error.message });

  }
})

module.exports = router;