var models = require('../models');
var express = require('express');
var router = express.Router();
var basicAuthentication = require('../lib/authentication').basicAuthentication;

/* GET admin page */
router.get('/', basicAuthentication, function(req, res) {
  res.render('admin');
});

router.get('/add-question', basicAuthentication, function(req, res) {
  res.render('admin-add-question');
});

router.post('/add-question', basicAuthentication, function(req, res) {
  var questionTitle = req.body.questionTitle;
  var choices = req.body['choices[]'];

  if (typeof choices === 'string') { // Occurs when only one choice is submitted
    choices = [choices];
  }

  models.Question.create({
    title: questionTitle,
    Choices: choices.map(function(text) { return { text: text }; })
  }, {
    include: models.Choice
  })
  .then(function() {
    res.render('admin-add-question');
  })
  .catch(function(error) {
    res.render('error', {
      error: error
    });
  });
});

router.get('/stats', basicAuthentication, function(req, res) {
  models.Question.findAll({
    include: [
      { model: models.Choice, include: models.Response }
    ],
    order: 'Question.id ASC'
  })
  .then(function(questions) {
    var byQuestion = questions.map(function(question) {
      var choices = question.Choices.map(function(choice) {
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

    res.render('admin-stats', { by_question: byQuestion });
  });
});

module.exports = router;
