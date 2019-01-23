process.env.NAME = "projectbackend";
// BEGIN: initialize tracing
const yamlconfig = require('node-yaml-config');
const config = yamlconfig.load(__dirname + '/config.yaml');
const port = config.port;
const express = require('express');
const path  = require('path');
const bodyParser = require('body-parser');
const cookieparser = require('cookie-parser');
const app = express();
const cors = require('cors')
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieparser());
app.use(express.static(path.join(__dirname, 'public')));


/*  Modules  */
const schedular = require('./schedular/scheduleJob').changeState;
//  Config - creds
const config_creds = require('./config/config');
const  db_config = config_creds.MYSQL_CREDS ;
/*    Database     */
const DBconn = require('./connection/Connection').Connection;
DBconn.connect(db_config.host,db_config.username,db_config.password,db_config.database);

// MYSQL query module
const mysql = require('./connection/Db');


/*   CORS EXCEPTION Handling   */
app.use(function(req, res, next) { 
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); 
    res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept,Authorization");  // authorization,content-type
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Credentials","true");
    next(); 
});


app.get('/records',(req,res,next)=>{
    console.log('===========  Get Records =============');
    mysql.retrieve('select * from test',(err,result) => {
         console.log(err);
         let resp = {};
         if(err){
             resp.code = res.statusCode = 400 ;
             resp.message = (err)?err:'exception' ;
         }else{
             resp.code = res.statusCode = 200 ;
             resp.result = result ;
             resp.message = 'success' ;
         }
         res.send({'result':result});
    });  
});

app.delete('/clear',(req,res,next)=>{
    console.log('===========  Authorization =============');
    mysql.query('delete from test',(err,result) => {
         console.log(err);
         let resp = {};
         if(err){
             resp.code = res.statusCode = 400 ;
             resp.message = (err)?err:'exception' ;
         }else{
             resp.code = res.statusCode = 200 ;
             resp.result = result ;
             resp.message = 'success' ;
         }
         res.send({'result':result});
    });  
});



// /*   Socket Handling */
// io.sockets.on('connection', function (socket) {
//     console.log('client connect');
//     socket.on('echo', function (data) {
//         io.sockets.emit('message', data);
//     });
// });
/*    Exception Handling      */
app.all('*',(req,res)=>{
    res.status(400).send({code:400,'message':'Request API not found '+req.baseUrl+req.path}) ;
})


/*   Job Schedular   */
setInterval(schedular,1*60*1000);
process.on('unhandledRejection', (reason, p) => {
    console.log("Possibly Unhandled Rejection at: Promise ", p, " reason: ", reason);
	console.log("Possibly Unhandled Rejection at: Promise ", p, " reason: ", JSON.stringify(reason.stack));
});
process.on('uncaughtException', (reason) => {
    console.log("Possibly uncaught Exception reason: ", reason );
    if(reason && reason.stack)
        console.log("Possibly uncaught Exception reason: ", reason," at : ", reason.stack);
});
app.listen(port,(err)=>{
    console.log("Service is running :"+port);
});

