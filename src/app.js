const express = require('express');
const app = express();
const connectDB = require('./config/database');
const User = require('./models/user');
const {validateSignUpData} = require('./utils/validation');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const {userAuth} = require('./middlewares/auth');

app.use(express.json());
app.use(cookieParser())


//signup
app.post('/signUp',async(req,res)=>{
    
    try {
        validateSignUpData(req);
        
        const {firstName,lastName,skills,password,emailId} = req.body;
        const isExisting = await User.findOne({emailId:emailId})
        console.log(isExisting)
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

//login api
app.post('/login',async (req,res)=>{
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

//profile
app.get('/profile',userAuth,async (req,res)=>{
   try {
     const user = req.user;
     res.send(user);

   } catch (Error) {
    res.status(400).send("ERROR :"+Error)
   }

})

//send connection request 

app.post('/sendConnectionRequest',userAuth,async(req,res)=>{
    const user = req.user;

    res.send(user.firstName + ' sent the connection request');
})



connectDB()
.then(()=>{
    console.log('Database Connection Established');
    app.listen(3000,()=>{
        console.log('server is successfully listening on port 3000')
    })
})
.catch((err)=>{
    console.error(err)
})


