var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mongodb = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/proba');
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

var proba = require('./routes/login');
app.use('/proba', proba);

app.get('/getUsers', function (req, res) {
  res.send('Show users');
});

app.listen(4002, function () {
  console.log('Example app listening on port 4002!')
});

