

exports.query =  (query,callback)=>{
    db.query(query,(err,results) => {        
        return callback(err,results);
    });
}

exports.retrieve = (query,callback) => {
    db.query(query,(err,results) => {        
        return callback(err,results);
    });
}