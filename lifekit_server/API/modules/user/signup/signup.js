'use strict';

var fs = require('fs');
var AWS = require('aws-sdk');


function signup(){
}

function makeCode() {
    var high = 9999;
    var low = 0;
    var rand = Math.floor(Math.random() * (high - low + 1) + low);
    rand = rand.toString();
    while(rand.length < 4)
    {
        rand = "0" + rand;
    }
    return (process.env.NODE_ENV != "test") ? rand : "0000";
}

function getCodeForNum(phone,cache) {
    if(cache.has(phone))
        return cache.get(phone,true); // Will not update last used time
    else
    {
        var code = makeCode();
        cache.set(phone,code);
        return code;
    }
}

signup.prototype.signup = function(req,res,cache) {
    var to = req.query.phone;

    var code = getCodeForNum(req.query.phone,cache);

    AWS.config.region = 'us-east-1';
    var sns = new AWS.SNS();

    var sendto = '+1' + to;
    var msg = 'Verify code for lifekit: ' + code;

    var params = {
        Message: msg,
        MessageStructure: 'string',
        PhoneNumber: sendto
    };

    sns.publish(params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
            else     console.log(data);           // successful response
        });

    res.status(200).send({"status":"200","result":code});
};

module.exports = signup;
