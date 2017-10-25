var express = require('express');
var router = express.Router();

router.post('/', function (req, res, next) {
    var email = req.body.email;
    var password = req.body.password;
    var db = req.db;
    var users = db.get('users');
    users.find({ email: email, pass: password })
        .then(function (data) {
            if (data.length > 0) {
                req.session.userId = data[0]._id;
                res.redirect('/');
            } else {
                res.render('login', { message: 'Are probvai pak moi chovek' });
            }
        });
});
router.get('/', function (req, res, next) {
    if (req.session.email)
        res.redirect('/');
    else
        res.render('login');
});

module.exports = router;
