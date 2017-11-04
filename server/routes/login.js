var express = require('express');
var UserModel = require('../models/user-model');
var sha1 = require('sha1');
var router = express.Router();

var userModel = new UserModel();

router.post('/', function (req, res, next) {
    var email = req.body.email;
    var password = sha1(req.body.password);
    
    userModel.findUser({email: email, password: password}).then(function(data) {
        if(data.length > 0) {
            sess = req.session;
            sess.userId = data[0]._id;
            delete data[0].password; 
            res.json({ status: 1, data: data[0] , message: 'Successful login!', sess: sess });
        } else {
            res.status(400).json({ message: 'Wrong user data!' });
        }
    }).catch(function(err) {
        res.status(400).json({ message: 'Something went wrong!' });
    }); 
});

module.exports = router;
