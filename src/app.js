const express = require('express');
const app = express();



app.get('/getUserData',(req,res)=>{
    try {
        throw new Error('gfhjhdsaf')
        res.send('gotten user data')
    } catch (error) {
        res.status(500).send('something wronng while take userdata')
    }
})

app.use('/',(err,req,res,next)=>{
    if(err){
        res.status(500).send('something went to wrong')
    }
})


app.listen(3000,(req,res)=>{
    console.log('servere successfully listening port 3000')
})