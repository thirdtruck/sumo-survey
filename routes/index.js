var uuidV4 = require('uuid/v4');
var models = require('../models');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var promise;

  if (req.session.uuid) {
    promise = models.Guest.find({
      where: { sessionId: req.session.uuid }
    })
  } else {
    req.session.uuid = uuidV4();

    promise = models.Guest.create({
      sessionId: req.session.uuid
    });
  }

  promise.then(function(guest) {
    return models.Question.find({
      include: [{ model: models.Choice }],
      order: [ [ models.sequelize.fn('RANDOM') ] ]
    })
  })
  .then(function(question) {
    return {
      title: question.title,
      choices: question.Choices.map(function(choice) {
        return { text: choice.text };
      })
    };
  })
  .then(function(question) {
    res.render('index', {
      question: question
    });
  });
});

module.exports = router;
