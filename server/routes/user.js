var express = require('express');
var router = express.Router();
var sha1 = require('sha1');
var UserModel = require('../models/user-model');

var userModel = new UserModel();

function checkForSession(req) {
    var sessionId = req.session.userId;
    if (!sessionId) {
        return false;
    }
    return sessionId;
}

router.get('/profile/:profileId', function (req, res) {
    var id = checkForSession(req);
    if (id) {
        var profileId = req.params.profileId;
        userModel.findUser(profileId).then(function (data) {
            delete data[0].password;
            res.json({ data: data[0] });
        });
    } else {
        res.status(401).json({ message: 'You are not logged in!!' });
    }
});

router.get('/profile', function (req, res) {
    var id = checkForSession(req);
    if (id) {
        userModel.findUser(id).then(function (data) {
            delete data[0].password;
            res.json({ data: data[0] });
        });
    } else {
        res.status(401).json({ message: 'You are not logged in!!' });
    }
});

router.post('/update', function (req, res) {
    var name = req.body.name;
    var lastname = req.body.lastname;
    var email = req.body.email;
    var birthday = req.body.birthday;
    var sex = req.body.sex;
    var password = sha1(req.body.password);
    var id = checkForSession(req);
    if (id) {
        userModel.updateUserInfo(id, name, lastname, email, birthday, sex, password).then(function (data) {
            delete data.password;
            res.json({ data: data });
        });
    } else {
        res.status(400).json({ message: 'Something went wrong!' });
    }
});

module.exports = router;