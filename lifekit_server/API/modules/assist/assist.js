const userinfo = require('../../models').userinfo;

function assist() {
}

exports.assist = function(req, res) {

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
            switch(req.route.path)
            {
            case "/assist/create":
                var creator = require('./create/create.js');
                var create = new creator();
                create.create(req, res, userinfos[0].dataValues.userid);
                break;
            case "/assist/comment":
                var commenter = require('./comment/comment.js');
                var comment = new commenter();
                comment.comment(req, res, userinfos[0].dataValues.userid);
                break;
            case "/assist/get":
                var getter = require('./get/get.js');
                var get = new getter();
                get.get(req, res, userinfos[0].dataValues.userid);
                break;
            default:
                res.sendStatus(404);
                break;
            }
        }
    })
    .catch((error) => {
        res.status(405).send({"status":"405","result":"fail"});
    });
};

