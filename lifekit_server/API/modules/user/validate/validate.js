var crypto = require('crypto');
const userinfo = require('../../../models').userinfo;


function validate() {
}

validate.prototype.validate = function(req,res,cache) {
    var number = req.query.phone;
    var code = req.query.code;
    var cache_code = cache.get(number,true);
    self = this;
    if( (cache_code === code) ||
        ((process.env.NODE_ENV=="test") && (code == "0000")) )
    {
        userinfo.findAll({
            where: {
                "phone_number": number
            }
        })
        .then(userinfos => {
            var refreshToken = null;
            if(userinfos.length != 0) {
                refreshToken = userinfos[0].dataValues.refresh_token;
                res.status(200).send({"status":"200","result":refreshToken});
            }
            else {
                crypto.randomBytes(32, function(err,buffer) {
                    refreshToken = (process.env.NODE_ENV != "test") ? buffer.toString('hex') : "this_is_test_refresh_token";
                    userinfo.create({
                        "phone_number": number,
                        "refresh_token": refreshToken,
                        "access_token": "",
                        "access_token_expiration": new Date(),
                        "last_location": ""
                    })
                    .then(() => {
                        res.status(200).send({"status":"200", "result":refreshToken});
                    })
                    .catch((error) => {
                        res.status(400).send({"status":"400", "result":"Could not create new user info"});
                    });
                });
            }
        })
        .catch((error) => {
            res.status(400).send({"status":"400", "result":"error from db"});
        });
    }
    else
    {
        res.status(400).send({"status":"400","result":"Wrong code"});
    }
}

module.exports = validate;

