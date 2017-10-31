var express = require('express');
var UserModel = require('../models/user-model');
var router = express.Router();

var userModel = new UserModel();

router.post('/', function (req, res, next) {
    var email = req.body.email;
    var password = req.body.password;
    
    userModel.findUser({email: email, password: password}).then(function(data) {
        if(data.length > 0) {
            sess = req.session;
            sess.userId = data[0]._id;
            res.json({ status: 1, data: data[0] , message: 'Successful login!', sess: sess });
        } else {
            res.json({ status: 0, message: 'Invalid user data!' });
        }
    }).catch(function(err) {
        res.json({ status: 0, data: err, message: 'Something went wrong!' });
    }); 
});

router.post('/test', function (req, res, next) {
    sess = req.session;
    res.json({ test: sess });
});

module.exports = router;
