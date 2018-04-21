var express = require('express');
var router = express.Router();

/* require mongo */
var mongo = require('mongodb');
var assert = require('assert');

// local host
//var url = 'mongodb://localhost:27017/kweeni'; // run mongo terminal, read 2nd line  + /databasename
var online = 'mongodb+srv://Admin:4dm!n@gettingstarted-jbvu6.mongodb.net/kweeni'; 
/* GET home page + data */
router.get('/', function (req, res, next) {
  // global var for item
  var item; 
  // connect to database
  mongo.connect(online, function (err, db) {
    // check if no errors
    assert.equal(null, err);
    // get last item back 
    var cursor = db.db('kweeni').collection('questions').find().sort({$natural:-1}).limit(1);
    // run through all entries 
    cursor.forEach(function (doc, err) {
      assert.equal(null, err);
      console.log('--- Get items ---');
      console.log(doc); 
      item = doc; 
    }, function () {
      // callback -> after: close db, render get page with item
      db.close();
      res.render('index', { title: 'Home', question: item.question, answer1: item.answer1, answer2: item.answer2});
    });
  });
});

/* GET createpoll page. */
router.get('/createpoll', function(req, res, next) {
  res.render('createpoll', { title: 'Create Poll' });
});

/* POST data to createpoll page */
  router.post('/createpoll',function(req,res,next){
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
      db.db('kweeni').collection('questions').insertOne(item, function (err, result) {
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

module.exports = router;