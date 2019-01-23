
const https = require('../module/http');
const yamlconfig = require('node-yaml-config');
const config = yamlconfig.load(process.cwd()+'/config.yaml');
/*
    Steps : 
    1. Create State value
    2. Insert into MYSQL
    3. if Success push to firebase
*/
const mysql = require('../connection/Db');
exports.changeState = () => {
    console.log("Vivek");
    let date = new Date();
    let randomNumber = parseInt(Math.random()*1000000);
    let createDate = date.toISOString() ;
    insertItem (randomNumber,createDate,(err,result)=>{
        // push_notif.pushToFcm({'name':'vivek java'},(err,result)=>{
        //     console.log('Inserted : '+JSON.stringify(result));
        // });
        let [title,message,link]= [null,null,null];        
        if(err){
            title = 'Process failed.';
            message = 'Due to technical error..! :(';
            link = 'http://localhost:3000';
        }else{
            title = 'New Notification By Vivek' ;
            message = 'Please click here to see';
            link = 'http://localhost:3000?refresh=true';
        }
        firePushMessage(config.clienttoken,
        title,
        message,
        link,(err,result)=> {
            if(err){
                console.log("Error occured while pushing message");
                console.log(result);
            }else{
                console.log("Message Pushed");
                console.log(result);
            }
        });
    });

}

function insertItem(randomNumber,createDate,callback) {
    
    
    let query = "insert into test values('"+randomNumber+"','"+createDate+"')";
    mysql.query(query,(err,result)=>{        
        console.log(err);
        console.log(result);
        callback(err,result);
    });
}
function firePushMessage(clientToken,title,message,link,callback){
    
    let details = {};
    details.host = 'fcm.googleapis.com' ;
    details.method= 'post' ;
    details.path= '/fcm/send';
    //details.port= 1000 ;//sys_config.services.auth.port;
    details.headers= {
        'Content-Type':'application/json',
        'Authorization':'key='+config.serverKey
    };
    let payload = 
    {
        "notification": {
            "title": title,
            "body": message,
            "click_action": link
        },
        "to": clientToken
    }    
    console.log(payload);
    https.post(details,payload,(err,response)=>{
        if(err) return callback(err);
        else return callback(null,response);
    });
}