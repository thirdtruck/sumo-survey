var models = require('../models');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  models.Question.create({
    title: "A Question"
  })
  .then(
    function(question) {
      models.Question.findAll()
      .then(function(questions) {
        res.render('index', {
          question: { title: question.get('title') }
        });
      })
    },
    function(error) {
      res.render('error', {
        error: error,
        message: "Unable to create Question."
      })
    }
  )
});

module.exports = router;
