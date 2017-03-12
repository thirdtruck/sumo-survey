var uuidV4 = require('uuid/v4');
var models = require('../models');
var express = require('express');
var router = express.Router();

function getOrCreateGuest(sessionUUID) {
  if (sessionUUID) {
    return models.Guest.find({
      where: { sessionId: sessionUUID }
    })
  } else {
    return models.Guest.create({
      sessionId: uuidV4()
    });
  }
}

/* GET home page. */
router.get('/', function(req, res, next) {
  getOrCreateGuest(req.session.uuid)
  .then(function(guest) {
    req.session.uuid = guest.sessionId;

    return models.Question.find({
      include: [{ model: models.Choice }],
      order: [ [ models.sequelize.fn('RANDOM') ] ]
    })
  })
  .then(function(question) {
    var choices = question.Choices;

    // TODO: Sort in query instead of here
    choices.sort(function(a, b) {
      return a.id - b.id;
    });

    return {
      // TODO: In a real world app, I would use and expose UUIDs instead of DB row IDs
      id: question.id,
      title: question.title,
      choices: choices.map(function(choice) {
        return {
          id: choice.id,
          text: choice.text
        };
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
