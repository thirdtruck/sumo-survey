var models = require('../models');
var express = require('express');
var router = express.Router();
var basicAuthentication = require('../lib/authentication').basicAuthentication;

/* GET admin page */
router.get('/', basicAuthentication, function(req, res, next) {
  res.render('admin');
});

router.get('/stats', basicAuthentication, function(req, res, next) {
  models.Question.findAll({
    include: [
      { model: models.Choice, include: models.Response }
    ],
    order: 'Question.id ASC'
  })
  .then(function(questions) {
    var by_question = questions.map(function(question) {
      var choices = question.Choices.map(function(choice) {
        console.log(choice.Responses);
        return {
          id: choice.id,
          text: choice.text,
          count: choice.Responses.length
        };
      });

      return {
        id: question.id,
        title: question.title,
        choices: choices
      };
    });

    res.render('admin-stats', { by_question: by_question });
  })
});

module.exports = router;
