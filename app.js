var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// MONGO
var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

var url = 'mongodb://localhost:27017';

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to Mongo server");

  db.close();
});
//


app.use(express.static('public'));
app.use(bodyParser.urlencoded({
  extended: false
}));

app.get('/register', function (req, res) {
  var fileName = __dirname + '/views/registration.html'
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