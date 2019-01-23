var firebase = require('firebase-admin');
var fcm_creds = require('../config/config').PUSH_MESSAGE;

firebase.initializeApp({
  credential: firebase.credential.cert(fcm_creds),
  databaseURL: "https://reactnode-850ff.firebaseio.com"
});
exports.pushToFcm = function pushToFcm(object,callback){
    var db = firebase.database();
    var ref = db.ref('users');
    var ref = firebase.database().ref('pushtest');
    ref.update({name:parseInt(Math.random()*1000)})// Updates only the specified attributes 
    return callback(null,'requested');
}