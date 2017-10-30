var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mongodb = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/facebook');
var session = require('express-session');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
  secret:'secret',
  saveUnititialized:true,
  resave:true
}));

var register = require('./routes/register');
var login = require('./routes/login');
var logout = require('./routes/logout');
var user = require('./routes/user');

app.use('/login', login);
app.use('/register', register);
app.use('/logout', logout);
app.use('/user', user);

app.listen(4000, function () {
  console.log('Example app listening on port 4000!')
});

