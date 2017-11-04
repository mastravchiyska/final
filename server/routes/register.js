var express = require('express');
var UserModel = require('../models/user-model');
var sha1 = require('sha1');
var router = express.Router();

var userModel = new UserModel();

router.post('/', function (req, res, next) {
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
                res.json({ status: 1, message: 'Successfull register!'});
            });
        }
    });
});
module.exports = router;
