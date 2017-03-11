var models = require('../models');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  models.Question.findAll({
    include: [{ model: models.Choice }]
  })
  .then(function(questions) {
    var qs = questions.map(function(question) {
      return {
        title: question.title,
        seq: [
          { test: 'one' },
          { test: 'two' }
        ],
        choices: question.Choices.map(function(choice) {
          return { text: choice.text };
        })
      };
    });
    res.render('index', {
      question: qs[qs.length - 1]
    });
  });
});

module.exports = router;
