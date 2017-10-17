const express = require('express');
const app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/getUsers', function (req, res) {
  res.send('Show users');
});

app.listen(4002, function () {
  console.log('Example app listening on port 4002!')
})