var express = require('express');
var router = express.Router();

/* require mongo */
var mongo = require('mongodb');
var assert = require('assert');

var url = 'mongodb://localhost:27017/kweeni'; // run mongo terminal, read 2nd line  + /databasename

/* variabelen die doorgegeven moeten worden */
var question, answer1, answer2;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home', question: question, answer1: answer1, answer2: answer2});
});

/* GET get page + data */
router.get('/get', function (req, res, next) {
  // connect to database
  mongo.connect(url, function (err, db) {
    // check if no errors
    assert.equal(null, err);
    // get last item back 
    var cursor = db.db('kweeni').collection('questions').find();
    // run through all entries 
    cursor.forEach(function (doc, err) {
      assert.equal(null, err);
      console.log('--- Get items ---');
      console.log(doc); 
    }, function () {
      // callback -> after: close db, render get page with item resultarray 
      db.close();
      res.redirect('/');
    });
  });
});

/* GET createpoll page. */
router.get('/createpoll', function(req, res, next) {
  res.render('createpoll', { title: 'Create Poll' });
});

/* POST data to createpoll page */
router.post('/createpoll',function(req,res,next){
  question = req.body.question; 
  answer1 = req.body.answer1;
  answer2 = req.body.answer2;
  res.redirect('/');
});


/* GET insert page. */
router.get('/insert', function(req, res, next) {
  res.render('insert', { title: 'Insert'});
});

/* POST data into insert page */
router.post('/insert', function (req, res, next) {
  // create item
  var item = {
    question: req.body.question,
    answer1: req.body.answer1,
    answer2: req.body.answer2
  };

  // connect to mongo db
  mongo.connect(url, function (err, db) {
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