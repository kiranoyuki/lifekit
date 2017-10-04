var Expirable = require('expirable');
var cache = new Expirable('5 minutes');

function emergency() {
}

exports.user = function(req, res) {
    switch(req.params.type)
    {
    case "signup":
        var signuper = require('./signup/signup.js');
        var signup = new signuper();
        res.send(signup.signup(req, res, cache));
        break;
    case "validate":
        var validater = require('./validate/validate.js');
        var validate = new validater();
        validate.validate(req, res, cache);
        break;
    case "signin":
        var signiner = require('./signin/signin.js');
        var signin = new signiner();
        signin.signin(req,res);
        break;
    default:
        res.sendStatus(404);
        break;
    }
};
