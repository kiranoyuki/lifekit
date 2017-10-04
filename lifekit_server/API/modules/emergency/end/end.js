const emergency = require('../../../models').emergency;

var mysql = require('mysql');

function end() {
}

end.prototype.end = function(req, res) {
    emergency.findById(req.body.emergencyid)
    .then(emer => {
        emer.update({
            "status": 1,
            "ended_at": new Date()
        })
        .then(() => {
            var connection = mysql.createConnection(
            {
                localAddress    :   '127.0.0.1',
                port            :   '9306'
            });
            connection.connect();
            var queryString = "DELETE from emergency where id=" + req.body.emergencyid
            connection.query(queryString,function(err,result) {
                if(err)
                    console.log(err);
            });
            connection.end();
            res.status(200).send({"status": "200", "result": "updated emergency"});
        })
        .catch((error) => {
            res.status(400).send({"status": "400", "result": "failed to update emergency"});
        })
    })
    .catch(error => {
        res.status(400).send({"status": "400", "result": "failed to find emergency or error from db"});
    })
}

module.exports = end;

