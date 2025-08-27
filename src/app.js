const express = require('express');
const app = express();

app.use('/user',(req,res,next)=>{
    console.log('1st handler worked');
    next();
    
},
(req,res,next)=>{
    console.log('2nd handler worked');
    next()
},
(req,res,next)=>{
    console.log('3rd handler worked');
    next();
    
},
(req,res)=>{
    console.log('4th handler worked');
    res.send('4th response')
}
)


app.listen(3000,()=>{
    console.log('server is successfully listning on port 3000')
});