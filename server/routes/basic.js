var express = require('express');
var router = express.Router();
var sha1 = require('sha1');
var UserModel = require('../models/user-model');
var SearchModel = require('../models/search-model');

var userModel = new UserModel();
var searchModel = new SearchModel();

router.post('/login', function (req, res) {
    var email = req.body.email;
    var password = sha1(req.body.password);

    userModel.findUser({email: email, password: password}).then(function(data) {
        if(data.length > 0) {
            sess = req.session;
            sess.userId = data[0]._id;
            delete data[0].password;
            res.json({ data: data[0] , message: 'Successful login!' });
        } else {
            res.status(400).json({ message: 'Wrong user data!' });
        }
    }).catch(function(err) {
        res.status(400).json({ message: 'Something went wrong!' });
    });
});

router.get('/logout', function (req, res) {
    req.session.destroy();
    res.json({ message: 'You are logged out!' });
});

router.post('/register', function (req, res) {
    var name = req.body.name;
    var lastname = req.body.lastname;
    var email = req.body.email;
    var birthday = req.body.birthday;
    var sex = req.body.sex;
    var password = sha1(req.body.password);

    userModel.findUser({email: email}).then(function(data) {
        if(data.length > 0) {
            res.status(400).json({ message: 'This email is already used!' });
        } else {
            userModel.createUser(name, lastname, email, birthday, sex, password).then(function() {
                res.json({ message: 'Successfull register!'});
            });
        }
    });
});

router.post('/search', function (req, res) {
    var searchString = req.body.searchString;
    var separatedString = searchString.split(' ');

    searchModel.search(separatedString).then(function (data) {
        res.json({ data: data });
    });
});

module.exports = router;
