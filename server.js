var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mongodb = require('mongodb');
var monk = require('monk');
var session = require('express-session');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

var basicRoutes = require('./server/routes/basic');
var user = require('./server/routes/user');
var friend = require('./server/routes/friend');
var post = require('./server/routes/post');
var ChatModel = require('./server/models/chat-model');

var chatModel = new ChatModel();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
  secret:'secret',
  saveUnititialized:true,
  resave:true
}));

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(basicRoutes);
app.use('/user', user);
app.use('/friend', friend);
app.use('/post', post);
app.use(express.static(path.join(__dirname, 'public')));

app.listen(4000, function () {
  console.log('Example app listening on port 4000!')
});

io.on('connection', function(client){
  client.on('sendMessage', function(data) {
    chatModel.getChat(data.members).then(function(result) {
      var newChronology = result.messages.push(data.message);
      chatModel.saveChat(result._id, newChronology).then(function() {
        result.messages = newChronology;
        io.sockets.emit('returnChronology', result);
        resolve(true);
      });
    });
  });

  client.on('getChronology', function(membersList) {
    console.log(membersList);
    chatModel.getChat(membersList).then(function(result) {
      io.sockets.emit('returnChronology', result);
    });
  });
});

server.listen(3000);