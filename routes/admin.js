const models = require('../models');
const express = require('express');
const basicAuthentication = require('../lib/authentication').basicAuthentication;

const router = express.Router();

function onGetIndex(req, res) {
  res.render('admin');
}

/* GET admin page */
router.get('/', basicAuthentication, onGetIndex);

/* GET admin/add-question page */

function onGetAddQuestion(req, res) {
  res.render('admin-add-question');
}

router.get('/add-question', basicAuthentication, onGetAddQuestion);

/* POST admin/add-question page */

function onPostQuestion(req, res) {
  const questionTitle = req.body.questionTitle;
  let choices = req.body['choices[]'];

  if (typeof choices === 'string') { // Occurs when only one choice is submitted
    choices = [choices];
  }

  function mapTextToJSON(text) {
    return { text };
  }

  function renderPage() {
    res.render('admin-add-question');
  }

  function onError(error) {
    res.render('error', { error });
  }

  models.Question.create({
    title: questionTitle,
    Choices: choices.map(mapTextToJSON),
  }, {
    include: models.Choice,
  })
  .then(renderPage)
  .catch(onError);
}

router.post('/add-question', basicAuthentication, onPostQuestion);

/* GET admin/stats page */

function mapChoiceStatsToJSON(choice) {
  return {
    id: choice.id,
    text: choice.text,
    count: choice.Responses.length,
  };
}

function mapQuestionStatsToJSON(question) {
  const choices = question.Choices.map(mapChoiceStatsToJSON);

  return {
    id: question.id,
    title: question.title,
    choices,
  };
}

function getStats(req, res) {
  function renderStats(questions) {
    const byQuestion = questions.map(mapQuestionStatsToJSON);

    res.render('admin-stats', { by_question: byQuestion });
  }

  models.Question.findAll({
    include: [{ model: models.Choice, include: models.Response }],
    order: 'Question.id ASC',
  })
  .then(renderStats);
}

router.get('/stats', basicAuthentication, getStats);

module.exports = router;
