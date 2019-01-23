var Joi = require('joi');

// defaultUserStatus
var defaultUserStatus=  ['pending','active','disabled','deleted'];
var defaulAccountType =  ['customer','reseller','enterprise','vendor', 'agent'];
var channelCodes=  ['GCM','BCM'];



exports.createcustomer = Joi.object().keys({
    email: Joi.string().email().lowercase().required(),   
    password: Joi.string().required(),
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    username: Joi.string().required()
});

exports.login = Joi.object().keys({
    password: Joi.string().required(),
    username: Joi.string().required()
});

//app.post('/api/authentication/account
// Create Request Access
var createReqAccess =  Joi.object().keys({
    Email: Joi.string().email().lowercase().required(),
    RequestAccess: Joi.string().valid('true').required(),
    ChannelCode: Joi.string().uppercase().required(),
    FullName: Joi.string(),
    FirstName: Joi.string(),
    LastName: Joi.string(),
    CompanyName: Joi.string().required(),
    AccountName: Joi.string().required(),
    AccountType: Joi.string().valid(defaulAccountType),
    Comments: Joi.string(),
    Address1: Joi.string().required(),
    Address2: Joi.string(),
    City: Joi.string().required(),
    State: Joi.string(),
    ZipCode: Joi.string(),
    Country: Joi.string().required()
});

