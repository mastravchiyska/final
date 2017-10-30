var express = require('express');
var UserModel = require('../models/user-model');
var router = express.Router();

var userModel = new UserModel();

function checkForSession(req){
    sessionEmail = req.session.email;
    if(!sessionEmail) {
        return false;
    }
    return sessionEmail;
}

router.get('/profile', function (req, res, next) {
    email = checkForSession(req);
    if(email) {
        userModel.findUser(email).then(function(data) {
            res.json({status: 1, data: data[0]});
        });
    } else {
        res.json({status: 0, message: 'You are not logged in!'});
    }
});

module.exports = router;