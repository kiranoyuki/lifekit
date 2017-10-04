module.exports = function(app){
    var assist = require('./assist/assist.js');
    app.post('/assist/create',assist.assist);
    app.put('/assist/comment',assist.assist);
    app.get('/assist/get',assist.assist);

    var emergency = require('./emergency/emergency.js');
    app.post('/emergency/start', emergency.emergency);
    app.put('/emergency/end', emergency.emergency);
    app.get('/emergency/:type', emergency.emergency);

    var update = require('./update/update.js');
    app.post('/update/:type', update.update);

    var user = require('./user/user.js');
    app.get('/user/:type', user.user);
}
