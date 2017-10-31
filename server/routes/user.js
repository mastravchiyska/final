var express = require('express');
var UserModel = require('../models/user-model');
var router = express.Router();

var userModel = new UserModel();

function checkForSession(req) {
    sessionId = req.session.userId;
    if (!sessionId) {
        return false;
    }
    return sessionId;
}

router.get('/profile', function (req, res, next) {
    id = checkForSession(req);
    if (id) {
        userModel.findUser(id).then(function (data) {
            res.json({ status: 1, data: data[0] });
        });
    } else {
        res.json({ status: 0, message: 'You are not logged in!' });
    }
});

router.post('/update', function (req, res, next) {
    var name = req.body.name;
    var lastname = req.body.lastname;
    var email = req.body.email;
    var birthday = req.body.birthday;
    var sex = req.body.sex;
    var password = req.body.password;
    id = checkForSession(req);
    if (id) {
        userModel.updateUserInfo(id, name, lastname, email, birthday, sex, password).then(function (data) {
            res.json({ status: 1, data: data });
        });
    } else {
        res.json({ status: 0, message: 'Something went wrong!' });
    }
});

router.get('/addFriend', function (req, res, next) {
    id = checkForSession(req);
    if (id) {
        userModel.addFriend(id, idFriend).then(function (data) {
            res.json({ status: 1 });
        });
    } else {
        res.json({ status: 0, message: 'You cannot add this person!' });
    }
});

router.get('/friends', function (req, res, next) {
    id = checkForSession(req);
    if (id) {
        userModel.listFriends(id).then(function (data) {
            var dataLength = data.length;
            var responded = 0;
            var friendsList = [];
            data.forEach(function (element) {
                userModel.findUser({ _id: element.friendId })
                    .then(function (data) {
                        responded++;
                        friendsList.push(data[0]);
                        if (responded === dataLength) {
                            res.json({ status: 1, data: friendsList });
                        }
                    })
            }, this);
        });
    } else {
        res.json({ status: 0, message: 'Something went wrong!' });
    }
});


module.exports = router;