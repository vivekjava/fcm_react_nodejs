const express = require('express');
const app = express.Router();
const customer = require('./Customer');

/*      Customer API    */ 
app.post('/customer',(req,res)=>{ 
    console.log('Create Customer');
    console.log(req.body);  
    customer.create(req, (err,results) => {
        if(err)  res.status((err.code)?err.code:400).send(err) ;
        else  res.status(200).send(results) ;
    });   
});

/*      Login-authenticate      */
app.post('/authenticate',(req,res)=>{
    customer.authenticate(req,(err,result)=>{
        if(err || !result.access_token)  res.status((err.code)?err.code:400).send(err) ;
        else{
            res.status(200).send(result) ;
        }  
    });
});
app.all('*',(req,res)=>{
    res.status(400).send({code:400,'message':'Request API not found '+req.baseUrl+req.path}) ;
})
module.exports = app ;