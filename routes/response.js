var models = require('../models');
var express = require('express');
var router = express.Router();

/* POST response . */
router.post('/', function(req, res, next) {
  models.Guest.find({
    where: { sessionId: req.session.uuid }
  })
  .then(function(guest) {
    return models.Response.create({
      GuestId: guest.id,
      QuestionId: req.body.questionId,
      ChoiceId: req.body.choiceId
    });
  })
  .then(function(response) {
    res.render('index');
  });
});

module.exports = router;
