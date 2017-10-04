const emergency = require('../../../models').emergency;
const assister = require('../../../models').assister;

var mysql = require('mysql');

function onduty() {
}

onduty.prototype.onduty = function(req, res, userid) {
    var previous_emergencies = [];
    assister.findAll({
        attributes: ['emergencyid'],
        where: {
            $and: [
                {"userid" : userid},
                {"com": {
                    $not: null
                    }
                }
            ]
        }
    })
    .then((emergencies) => {
        for(var i = 0; i < emergencies.length; i++)
            previous_emergencies.push(emergencies[i].dataValues.emergencyid);
        var connection = mysql.createConnection(
        {
            localAddress    :   '127.0.0.1',
            port            :   '9306'
        });
        connection.connect();
        // var queryString = "SELECT emergencyid,0 as status,lat_deg as emergency_lat,lng_deg as emergency_lng,nickname as user_nickname,address as emergency_address,started_at, GEODIST(" + req.query.lat * (Math.PI/180) + "," + req.query.lng * (Math.PI/180) + ",lat,lng) as distance FROM emergency WHERE distance < 1000000000000 and id NOT IN (" + previous_emergencies + ") ORDER BY distance ASC LIMIT 0,100;"
        var queryString = "";
        if(previous_emergencies.length != 0)
            queryString = "SELECT id as emergencyid,0 as status,lat_deg as emergency_lat,lng_deg as emergency_lng,nickname as user_nickname,address as emergency_address,started_at, GEODIST(" + req.query.lat * (Math.PI/180) + "," + req.query.lng * (Math.PI/180) + ",lat,lng) as distance FROM emergency WHERE distance < 1000000000000 and id NOT IN (" + previous_emergencies + ") ORDER BY distance ASC LIMIT 0,100;";
        else
            queryString = "SELECT id as emergencyid,0 as status,lat_deg as emergency_lat,lng_deg as emergency_lng,nickname as user_nickname,address as emergency_address,started_at, GEODIST(" + req.query.lat * (Math.PI/180) + "," + req.query.lng * (Math.PI/180) + ",lat,lng) as distance FROM emergency WHERE distance < 1000000000000 ORDER BY distance ASC LIMIT 0,100;";

        connection.query(queryString, function(err,rows,fields) {
            if(err)
            {
                res.status(400).send({"status":"400","result":"failed to get current emergencies"});
            }
            else
            {
                res.status(200).send({"status":"200","result":rows});
            }
        });
        connection.end();
    })
    .catch((error) => {
        res.status(400).send({"status":"400","result":"could not find emergencies"});
    })
    console.log(previous_emergencies);

}

module.exports = onduty;
