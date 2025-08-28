const express = require('express');
const app = express();

const {adminAuth,userAuth} = require('../middlewares/auth');
app.use('/admin',adminAuth);
// app.use('/user',userAuth);

app.get('/admin/getUserdata',(req,res)=>{
    res.send('all data sent');
})

app.get('/admin/deleteUser',(req,res)=>{
    res.send('deleted a user data');
})


app.get('/user',userAuth,(req,res)=>{
    res.send('it is user data')
})

app.get('/user/login',(req,res)=>{
    res.send('user logged')
});

app.listen(3000,(req,res)=>{
    console.log('servere successfully listening port 3000')
})