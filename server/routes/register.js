var express = require('express');
var UserModel = require('../models/user-model');
var router = express.Router();

var userModel = new UserModel();

router.post('/', function (req, res, next) {
    var name = req.body.name;
    var lastname = req.body.lastname;
    var email = req.body.email;
    var birthday = req.body.birthday;
    var sex = req.body.sex;
    var password = req.body.password;

    userModel.findUser(email).then(function(data) {
        if(data.length > 0) {
            res.json({ status: 0, message: 'This Email is already used!' })
        } else {
            userModel.createUser(name, lastname, email, birthday, sex, password).then(function() {
                res.json({ status: 1, message: 'Successfull register!'});
            });
        }
    });
});
module.exports = router;
