var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/register', function (req, res) {
  var options = {
    root: '/public'
  }
  var fileName = './views/registration.html'
  res.sendFile(fileName, function (err) {
    if (err) {
      console.log(err);
      res.status(err.status).end();
    }
    else {
      console.log('Sent:', fileName);
    }
  });
});

app.post('/register', function (req, res) {
  console.log(req.body)
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});