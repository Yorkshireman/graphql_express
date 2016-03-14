var express = require('express');
var app = express();

app.use(express.static('public'));

app.get('/register', function (req, res) {
  res.sendFile('./views/registration.html');
});

app.post('/register', function (req, res) {
  console.log(req)
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});