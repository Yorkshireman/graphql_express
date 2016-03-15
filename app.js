var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
  extended: false
}));

// MONGO CLIENT
var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

var url = 'mongodb://localhost:27017';

// MongoClient.connect(url, function(err, db) {
//   assert.equal(null, err);
//   console.log("Connected correctly to Mongo server");

//   findDocuments(db, function() {
//     db.close();
//   });
// });
//

// MONGO DOCUMENT INSERTION
var insertDocuments = function(db, team_name, email, callback) {
  var collection = db.collection('teams');

  collection.insert({
    team_name: team_name, 
    email: email
  }, function (err, result) {
    assert.equal(err, null);
    assert.equal(1, result.result.n);
    assert.equal(1, result.ops.length);
    console.log("Inserted 1 document into the document collection");
    callback(result);
  });
}
//

// MONGO RETURN ALL DOCUMENTS
var showAllDocuments = function(db, callback) {
  var collection = db.collection('teams');
  collection.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found the following records:");
    console.dir(docs);
    callback(docs);
  });
}

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
  console.log("SUBMITTED FORM DATA:");
  console.log(req.body);
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to Mongo server");
    insertDocuments(db, req.body.team_name, req.body.email, function() {
      showAllDocuments(db, function() {
        db.close();
      })
    });
  });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});