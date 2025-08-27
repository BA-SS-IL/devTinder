const express = require('express');
const app = express();

//this will match all the http methods api calls if write above all other methods (it will over ride)

app.use('/',(req,res)=>{
    res.send('hahahahah')
})

//this will only handle get calls to /user
app.get('/user',(req,res)=>{
    res.send({firstName:"Basil",lastName:"Varghese"})
});


app.post('/user',(req,res)=>{
    res.send('Data successfully saved to the data base')
});

app.delete('/user',(req,res)=>{
    res.send('successfully deleted data')
});


app.put('/user',(req,res)=>{
    res.send(' user data changed ')
})

app.patch('/user',(req,res)=>{
    res.send('user data changed partially ')
})

app.listen(3000,()=>{
    console.log('server is successfully listning on port 3000')
});