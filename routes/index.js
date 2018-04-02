var express = require('express');
var router = express.Router();
/* variabelen die doorgegeven moeten worden */
var question, answer1, answer2;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
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

module.exports = router;