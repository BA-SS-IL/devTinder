const express = require('express');
const app = express();
const connectDB = require('./config/database');
const User = require('./models/user');
const {validateSignUpData} = require('./utils/validation');
const bcrypt = require('bcrypt');
const e = require('express');



app.use(express.json());

//signup
app.post('/signUp',async(req,res)=>{
    
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
        res.status(400).send('ERROR SIGNUP'+error)
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
        const isPassword = bcrypt.compare(password,user.password);
        if(isPassword){
            res.send('login successfull');
        }else{
            throw new Error("password is not valid");
            
        }
    } catch (error) {
        res.status(400).send('ERROR: '+error)
    }
})

//Get user by emaili;
app.get('/user',async (req,res)=>{
    const userEmail = req.body.emailId;
    
    try {
        const user = await User.find ({emailId:userEmail});
        if(user.length === 0){
            res.status(404).send('user not found')
        }else{
            res.send(user)
        }
    } catch (error) {
        res.status(400).send('something went wrong')
    }
})

//Feed API GET/FEED - get all users from the data base;
app.get('/feed',async (req,res)=>{
    try {
        const users = await User.find({});
        if(users.length === 0){
            res.status(404).send('there are no users')
        }else{
            res.send(users)
        }
    } catch (error) {
        res.status(400).send('something went to wrong')
    }
})

//delete user short hand
app.delete('/user',async (req,res)=>{
    const userId = req.body._id;   
    try {
        //await User.findByIdAndDelete({_id:userId});
      const user =  await User.findOneAndDelete(userId);
        res.send('user deleted successfully');
    } catch (error) {
        res.status(400).send('something went to wrong')
    }
});

//update existing user

app.patch('/update/:userId',async (req,res)=>{
    const userId = req.params?.userId;
    const data = req.body;
    try {
        //api level validation
        const allowedUpadate = [
           "photoUrl",
            "gender",
            "age",
            "about",
            "skills"
        ]

        const isUpdateAllowed = Object.keys(data).every((k)=>allowedUpadate.includes(k))

        if(!isUpdateAllowed){
              throw new Error("update not allowed");              
        }

        if(data?.skills.length > 5){
            throw new Error("skills length is morethan 5");
            
        }

        const user = await User.findByIdAndUpdate({_id:userId},data,{
            returnDocument:'after',
            runValidators:true
        })
        

        if(user){
            res.send(user)
        }else{
            res.status(404).send('something went wrong when user updated')
        }
    } catch (error) {
        res.status(400).send('update failed'+error)
    }
})



connectDB()
.then(()=>{
    console.log('DB Connected');
    app.listen(3000,()=>{
        console.log('server is listening port 3000')
    })
})
.catch((err)=>{
    console.error(err)
})


