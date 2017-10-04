const assister = require('../../../models').assister;

function create() {
}

create.prototype.create = function(req, res, userid) {
    assister.findAll({
        where: {
            "userid": userid,
            "emergencyid": req.body.emergencyid
        }
    })
    .then(assisters => {
        if(assisters.length != 0) {
            if(assisters[0].dataValues.response != req.body.response) {
                assisters[0].update({
                    "response": req.body.response
                })
                .then(() => {
                    res.status(200).send({"status":"200","result":"changed response"});
                })
                .catch((error) => {
                    res.status(400).send({"status":"400","result":"Could not update assister's response"});
                });
            }
            else {
                res.status(200).send({"status":"200","result":"Acknowledged"});
            }
        }
        else {
            assister.create({
                "userid": userid,
                "emergencyid": req.body.emergencyid,
                "response": req.body.response
            })
            .then(() => {
                res.status(200).send({"status":"200","result":"Acknowledged"});
            })
            .catch((error) => {
                res.status(400).send({"status":"400","result":"Failed to add to assister"});
            })
        }
    })
    .catch((error) => {
        res.status(400).send({"status":"400", "result":"error from db"});
    });
}

module.exports = create;

