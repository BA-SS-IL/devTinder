const express = require('express');
const app = express();
const connectDB = require('./config/database');
const User = require('./models/user');


app.use(express.json());

app.post('/signUp',async (req,res)=>{
    const user = new User(req.body)

    try{
        if(user?.skills.length>5){
            throw new Error("skill is more than 5");    
        }
        await user.save();
        res.send('updated user information');
    }catch(err){
        res.status(400).send('can not update user information'+err)
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

