const userinfo = require('../../../models').userinfo;
const assister = require('../../../models').assister;

function status() {
}

status.prototype.status = function(req, res) {
    assister.findAll({
        where: {
            "emergencyid": req.query.emergencyid,
            "response": 1
        }
    })
    .then(assisters => {
        var userids = [];
        for(var i = 0; i<assisters.length; i++) {
            userids.push(assisters[i].dataValues.userid);
        }
        // console.log(userids);
        //res.status(200).send(assisters);
        userinfo.findAll({
            attributes: {
                exclude:["phone_number", "refresh_token", "access_token", "access_token_expiration"]
            },
            where: {
                "userid": userids
            }
        })
        .then(userinfos => {
            res.status(200).send({"status": "200", "result": userinfos});
        })
        .catch((error) => {
            res.status(405).send({"status":"405","result":"fail to get userinfos"});
        })
    })
    .catch(error => {
        res.status(400).send({"status":"400","result":"nothing found"});
    });
}

module.exports = status;

