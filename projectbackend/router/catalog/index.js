const express = require('express');
const app = express.Router();
const customer = require('./Customer');

/*      Customer API    */ 
app.post('/create',(req,res)=>{ 
    console.log('Create Customer');
    console.log(req.body);  
    return res.send(req.body)
});

app.all('*',(req,res)=>{
    res.status(400).send({code:400,'message':'Request API not found '+req.baseUrl+req.path}) ;
})
module.exports = app ;