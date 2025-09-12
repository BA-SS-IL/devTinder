const express = require('express');
const app = express();
const connectDB = require('./config/database');
const User = require('./models/user');


app.use(express.json());

app.post('/signUp',async (req,res)=>{
    const user = new User(req.body)

    try{
        await user.save();
        res.send('updated user information');
    }catch(err){
        res.status(400).send('can not update user information')
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
    const userId = req.body.userId;   
    try {
        //await User.findByIdAndDelete({_id:userId});
      const user =  await User.findOneAndDelete(userId);
        res.send('user deleted successfully');
    } catch (error) {
        res.status(400).send('something went to wrong')
    }
});

//

app.patch('/user',async (req,res)=>{
    const userId = req.body.userId;
    const data = req.body;
    try {
        const user = await User.findByIdAndUpdate({_id:userId},data);
        if(user){
            res.send(data)
        }else{
            res.status(400).send('can not update user details')
        }
    } catch (error) {
        res.status(400).send('something went wrong');
    }
});

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

