function location() {
}

location.prototype.location = function(req, res, userinfo) {
    userinfo.update({
        "last_lat": req.body.lat,
        "last_lng": req.body.lng
    })
    .then(() => {
        res.status(200).send({"status": "200", "result": "updated location"});
    })
    .catch((error) => {
        res.status(400).send({"status": "400", "result": "failed to update location"});
    })
}

module.exports = location;
