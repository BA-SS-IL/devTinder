const express = require('express');
const app = express();

//query
//http://localhost:3000/user?userId=01&password=testing
app.get('/user',(req,res)=>{
    console.log(req.query )
    res.send({firstName:"Basil",lastName:"Varghese"})
});

//params
//http://localhost:3000/user/01/basil/b@12jaksfh
app.get('/user/:userId/:name/:password',(req,res)=>{
    console.log(req.params)
    res.send({firstName:"Basil",lastName:"Varghese"})
});




app.listen(3000,()=>{
    console.log('server is successfully listning on port 3000')
});