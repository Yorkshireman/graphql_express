var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/register', function (req, res) {
  res.sendfile('./views/registration.html');
});

app.post('/register', function (req, res) {
  console.log(req.body)
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});