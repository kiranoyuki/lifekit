const assister = require('../../../models').assister;

function get() {
}

get.prototype.get = function(req, res, userid) {
    assister.findAll({
        where: {
            "userid": userid,
            "com": null
        }
    })
    .then(assisters => {
        res.status(200).send({"status":"200","result":assisters});
    })
    .catch(error => {
        res.status(400).send({"status":"400","result":"nothing found"});
    });
}

module.exports = get;
