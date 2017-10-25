var mongoose = require('mongoose');

//Create a schema
var UserSchema = new mongoose.Schema({
    name: {
        type: String
    },
    lastname: {
        type: String
    },
    email: {
        type: String
    },
    birthday:{
        type: Date
    },
    sex:{
        type: String
    },
    password: {
        type: String,
        required: true,
    }

});
var User = mongoose.model('User', UserSchema);
module.exports = User;

//Insert data into MongoDB
if (req.body.email &&
    req.body.username &&
    req.body.password &&
    req.body.passwordConf) {

    var userData = {
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        passwordConf: req.body.passwordConf,
    }

    //use schema.create to insert data into the db
    User.create(userData, function (err, user) {
        if (err) {
            return next(err)
        } else {
            return res.redirect('/profile');
        }
    });
}