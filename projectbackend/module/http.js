const https = require('https');

/*
{
			host:'localhost',
			method: 'post',
			path: '/billing/accountinfo',
			port:8120,
			headers:headers
		}
*/
// Post request
function post(options,body,callback){  
	return operation(options, JSON.stringify(body), function (err, result) {
        if(err || !result || result==undefined || result=='') return callback(err || 'request failed');
        else return callback(null, JSON.parse(result));
    });
}

//Common method for http request operation
function operation(options, body, callback) {

   console.log('::::::::::::::::::::::::::::operation::::::::::::::::::::::::::::::::');
   console.log('Options' + JSON.stringify(options, null, 2));
   console.log('body' +body);
   
    var req = https.request(options, (res) => {
        var data = '';
        //the listener that handles the response chunks
        res.addListener('data',  (chunk) => {
            data += chunk.toString();

        });
        res.addListener('end', (err, result) => {
            console.log('Status Code : '+res.statusCode);
            if (err) {
                console.log(err);
                return callback({'code':500,'message':err});
            }
            else {
                //console.log("Result : "+JSON.stringify(data));
                //console.log('Status Code : '+(parseInt(res.statusCode/100)));
                if((parseInt(res.statusCode/100))==2)
                {
                    return callback(null,data);
                }
                else if((parseInt(res.statusCode/100))==5)
                {
                    return callback(data);
                }else{
                   // console.log('Status Code : '+res.statusCode);
                    return callback(data);
                }
            }
        });
    });        
    req.on('error', function (e) {
        console.log('http request on error: e.message: ' + e.message);
        return callback({'code':500,'message':e.message});
    });
    if(body)
    {
        req.write(body);
    }
    req.end();
};

exports.post = post ;