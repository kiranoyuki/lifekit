const userinfo = require('../../models').userinfo;

function update() {
}

exports.update = function(req, res) {

    userinfo.findAll({
        where: {
            "access_token": req.query.accesstoken
        }
    })
    .then(userinfos => {
        var date = new Date();
        
        if(userinfos.length != 1) {
            res.status(404).send({"status":"404","result":"access token invalid"});
        }
        else if(date.valueOf() > userinfos[0].dataValues.access_token_expiration.valueOf()) {
            res.status(405).send({"status":"405","result":"expired access token"});
        }
        else {
            switch(req.params.type)
            {
            case "location":
                var locator = require('./location/location.js');
                var location = new locator();
                location.location(req, res, userinfos[0]);
                break;
            default:
                res.status(404).send({"status": "404", "result": "invalid url"});
                break;
            }
        }
    })
    .catch((error) => {
        res.status(405).send({"status":"405","result":"fail"});
    });
};

