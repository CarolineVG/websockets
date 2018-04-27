var express = require('express');
var router = express.Router();

/* require mongo */
var mongo = require('mongodb');
var assert = require('assert');


// local host
//var url = 'mongodb://localhost:27017/kweeni'; // run mongo terminal, read 2nd line  + /databasename
var online = "mongodb://admin:4dm!n@clustersockets-shard-00-00-xihhg.mongodb.net:27017,clustersockets-shard-00-01-xihhg.mongodb.net:27017,clustersockets-shard-00-02-xihhg.mongodb.net:27017/test?ssl=true&replicaSet=ClusterSockets-shard-0&authSource=admin";


/* GET home page + data */
router.get('/', function (req, res, next) {

  // global var for item
  var item;
  // connect to database
  mongo.connect(online, function (err, db) {
    // check if no errors
    assert.equal(null, err);
    // get database
    var dbo = db.db("dbsockets");
    // get last item back 
    var cursor = dbo.collection("questions").find().sort({
      $natural: -1
    }).limit(1);
    //console.log(cursor); 
    // run through all entries 
    cursor.forEach(function (doc, err) {
      assert.equal(null, err);
      console.log('--- Get items ---');
      console.log(doc);
      item = doc;
    }, function () {
      // callback -> after: close db, render get page with item
      db.close();
      res.render('index', {
        title: 'Home',
        question: item.question,
        answer1: item.answer1,
        answer2: item.answer2
      });
    });
  });
});

/* GET createpoll page. */
router.get('/createpoll', function (req, res, next) {
  res.render('createpoll', {
    title: 'Create Poll'
  });
});

/* POST data to createpoll page */
router.post('/createpoll', function (req, res, next) {
  // create item
  var item = {
    question: req.body.question,
    answer1: req.body.answer1,
    answer2: req.body.answer2
  };

  // connect to mongo db
  mongo.connect(online, function (err, db) {
    assert.equal(null, err);
    // access database, use collection to insert item 
    db.db('dbsockets').collection('questions').insertOne(item, function (err, result) {
      // callback (if no errors)
      assert.equal(null, err);
      console.log('--- Item inserted ---');
      console.log(item);
      db.close();
    });
  });

  // redirect to home page
  res.redirect('/');
});

//* GET list page + data */
router.get('/list', function (req, res, next) {

  // global var for item
  var item;
  // connect to database
  mongo.connect(online, function (err, db) {
    // check if no errors
    assert.equal(null, err);
    // get database
    var dbo = db.db("dbsockets");
    // get last item back 
    var cursor = dbo.collection("questions").find()
    //console.log(cursor); 
    // run through all entries 
    cursor.forEach(function (doc, err) {
      assert.equal(null, err);
      console.log('--- Get items ---');
      console.log(doc);
      item = doc;
    }, function () {
      // callback -> after: close db, render get page with item
      db.close();
      res.render('list', {
        title: 'List of questions', list:item
      });
    });
  });
});

module.exports = router;