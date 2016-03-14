var express = require('express');
var app = express();

app.get('/register', function (req, res) {
  res.sendfile('./views/registration.html');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});