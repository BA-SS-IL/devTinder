const express = require('express');
const app = express();
const connectDB = require('./config/database');
const User = require('./models/user')

app.post('/signUp',async (req,res)=>{
    const user = new User({
        firstName:'Blessan',
        lastName:'Varghese',
        emaiId:'blessan@gmail.com123',
        password:'Blessan@123',
        age:21,
        gender:'male'
    })

    try {
        await user.save();
    res.send('UserData saved db')
    } catch (error) {
        res.status(400).send('error while updating user data',error)
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

