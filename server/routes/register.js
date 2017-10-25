var express = require('express');
var router = express.Router();


var User = require('./models/user')
router.get('/register', function (req, res, next) {
    res.render('register');
});

router.post('/', function (req, res, next) {
    var name = req.body.name;
    var lastname = req.body.lastname;
    var birthday = req.body.birthday;
    var email = req.body.email;
    var password = req.body.password;
    var sex = req.body.sex;

    //Validation
    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('lastname', 'Last name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('password', 'Password is required').notEmpty();
    //req.checkBody('password2', 'Passwords do not match').equals(req.body.password);
    req.checkBody('birthday', 'Birthday is required').notEmpty();
    req.checkBody('sex', 'Sex is required').notEmpty();

    var errors = req.validationErrors();
    if (errors) {
        res.render('register', {
            errors: errors
        });
    } else {
        var newUser = new User({
            name: name,
            lastname: lastname,
            birthday: birthday,
            email: email,
            password: password,
            sex: sex
        });
        User.create(newUser);
    }
});

module.exports = router;
