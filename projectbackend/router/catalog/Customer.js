const mongo = require('../../connection/Db');
const async = require('async');
const uuid = require('uuid');
const crypto = require('crypto');
const yamlconfig = require('node-yaml-config');
const config = yamlconfig.load(process.cwd()+ '/config.yaml');
const joi = require('joi');
const schema = require('./schema');
var jwt = require('jsonwebtoken');

class Token{
    static createToken(data){
        return jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + (parseInt(config.expire)*60 * 60),
                    data: data
                }, 'secret');
    }
}
class Customer {
    constructor(){}
    static getPassword(password){
        return crypto.createHmac('sha256', config.cryptocode).update(password).digest('hex')
    }
}
exports.create = (req,callback) =>{
    let request = req.body ;    
    async.waterfall([
        (callback)=>{
            let validation = joi.validate(request,schema.createcustomer);
            if(validation && validation.error && validation.error.details){
                console.log(validation.error.details);
                return callback({'code':402,'message':'Invalid Input.'});
            }else{
                return callback(null);
            }
        },
        (callback)=>{            
            let query = {};
            query.$or =[];
            query.$or.push({email:request.email}) ;
            query.$or.push({username:request.username});
            mongo.retrieve('customer',query,{},(err,results)=>{
                if(err) callback(err);
                else if(results && results.length==0){                    
                    callback(null);
                }                   
                else{
                    callback({'code':402,'message':'customer account already exists.'});    
                }                               
            });
        },
        (callback) => {
            let response = {};
            let body = req.body ;
            body._id = uuid.v4();
            body.password = Customer.getPassword(request.password) ;
            body.createtime = new Date();
            mongo.insert('customer',body,(err,result)=>{
                if(err){            
                    return callback(err);
                }else{
                    response.message = 'customer created successfully.';
                    response.customerid = body._id ;
                    response.code = 200 ;
                    return callback(null,response);
                }
            });
        }
    ],function(err,result){
        /*
        error analysis and sending in the proper format
        to the router 
        */
        return callback(err,result);
    })
}

exports.authenticate = (req,callback) => {
    let request = req.body ;
    async.waterfall([ 
        (callback)=>{
            let validation = joi.validate(request,schema.login);
            if(validation && validation.error && validation.error.details){
                return callback({'code':402,'message':validation.error.details});
            }else{
                return callback(null);
            }
        },      
        (callback)=>{            
            let query = {};
            query.username = request.username ;
            query.password = Customer.getPassword(request.password);            
            mongo.retrieve('customer',query,{_id:1,firstname:1,lastname:1},(err,results)=>{
                if(err) callback(err);
                else if(results && results.length==1){                    
                    callback(null,results[0]);
                }                   
                else{
                    callback({'code':401,'message':'un-authorized'});    
                }                               
            });
        },      
        (customer,callback)=>{   
           // console.log(user);        
            let response  = {};
            response.access_token = Token.createToken({firstname:customer.firstname,
                                                        lastname:customer.lastname,
                                                        customer_id:customer._id});
            response.customer_id = customer._id ;
            response.code = 200 ;
            //console.log(response);
            return callback(null,response);
        }
    ],function(err,result){
        /*
        error analysis and sending in the proper format
        to the router 
        */
        return callback(err,result);
    })
    //return callback(Token.createToken(req.body));
}
