const express = require('express');
const app = express();

app.use('/',(req,res)=>{
    res.send('hello from the dashboard')
})

app.use('/hello',(req,res)=>{
    res.send('hello hello heloo')
})

app.use('/test',(req,res)=>{
    res.send('hello from the test')
})

app.listen(7777,()=>{
    console.log('server is successfully listning on port 3000')
});