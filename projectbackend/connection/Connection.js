const mysql = require('mysql')
global.db = null ;
class Connection {
    static connect(host,username,password,database){
       
        db = mysql.createConnection({
          host: host,
          user: username,
          password: password,
          database : database 
        });
        
        db.connect(function(err) {
          if (err){
            console.log("Database connection Failed : "+JSON.stringify(err));
            process.exit(-1);
          }
          console.log("Connected");           
        });
    }
}
exports.Connection = Connection;