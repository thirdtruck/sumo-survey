var models = require('../models');
var express = require('express');
var router = express.Router();

/* POST response . */
router.post('/', function(req, res) {
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
  .then(function() {
    res.render('index');
  });
});

module.exports = router;
