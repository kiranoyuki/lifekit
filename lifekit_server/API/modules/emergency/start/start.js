const emergency = require('../../../models').emergency;

var mysql = require('mysql');


function start() {
}

start.prototype.start = function(req, res, userid) {
    //console.log(req.body);
    var connection = mysql.createConnection(
    {
        localAddress    :   '127.0.0.1',
        port            :   '9306'
    });

    emergency.create({
        "userid": userid,
        "user_nickname" : req.body.user_nickname,
        "status": 0,
        "emergency_lat": req.body.lat,
        "emergency_lng": req.body.lng,
        "emergency_address": req.body.address,
        "started_at": new Date()
    })
    .then((emer) => {
        connection.connect();
        var queryString = "INSERT INTO emergency (id,nickname,lat,lng,lat_deg,lng_deg,address,started_at) VALUES (" + emer.emergencyid + ",'" + req.body.user_nickname + "','" + req.body.lat * (Math.PI/180) + "','" + req.body.lng * (Math.PI/180) + "','" + req.body.lat + "','" + req.body.lng + "','" + req.body.address + "','" + new Date() + "')"
        //console.log(queryString);
        connection.query(queryString, function(err, result) {
            if (err)
                console.log(err)
        });
        connection.end();
        res.status(200).send({"status": "200","result":emer.emergencyid});
    })
    .catch((error) => {
        res.status(400).send({"status": "400","result":"failed to create emergency"});
    })
}

module.exports = start;
