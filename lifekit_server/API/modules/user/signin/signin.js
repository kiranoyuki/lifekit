'use strict';
var crypto = require('crypto');
const userinfo = require('../../../models').userinfo;

function signin(){
}

signin.prototype.signin = function(req,res) {
    var phone = req.query.phone;
    var refresh = req.query.refreshToken;
    var accessToken = null;
    userinfo.findAll({
        where: {
            "phone_number": phone,
            "refresh_token": refresh
        }
    })
    .then(userinfos => {
        var self = this;
        if(userinfos.length != 1) {
            res.status(400).send({"status":"400","result":"user not found"});
            return;
        }
        else {
            var date = new Date(new Date().getTime() + 24*60*60*1000);
            console.log(date);
            crypto.randomBytes(32, function(err,buffer) {
                accessToken = (process.env.NODE_ENV != "test") ? buffer.toString('hex') : "this_is_test_access_token";
                userinfos[0].update({
                    "access_token": accessToken,
                    "access_token_expiration": date
                })
                .then(() => {
                    res.status(200).send({"status":"200","result":accessToken});
                    return;
                })
                .catch((error) => {
                    res.status(400).send({"status":"400","result":"failed to update"});
                    return;
                })
            });
        }
    })
    .catch((error) => {
        res.status(400).send({"status":"400","result":"nothing found"});
        return;
    })
}

module.exports = signin;
