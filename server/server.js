var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mongodb = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/facebook');
var session=require('express-session');
var app = express();

app.use(function(req, res, next) {
  req.db = db;
  next();
});

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

function requireLogin(req, res, next) {
  if (req.session.userId != undefined) {
    next();
  } else {
    res.redirect('/login');
  }
}

app.use('/login', login);
app.use('/register', register);
app.use('/logout', requireLogin, logout);
app.get('/getUsers', function (req, res) {
  res.send('Show users');
});

app.listen(4000, function () {
  console.log('Example app listening on port 4000!')
});

