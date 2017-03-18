const models = require('../models');
const express = require('express');

const router = express.Router();

function onPostResponse(req, res) {
  function createResponse(guest) {
    return models.Response.create({
      GuestId: guest.id,
      QuestionId: req.body.questionId,
      ChoiceId: req.body.choiceId,
    });
  }

  function renderResponse() {
    res.render('index');
  }

  models.Guest.find({ where: { sessionId: req.session.uuid } })
  .then(createResponse)
  .then(renderResponse);
}

/* POST response . */
router.post('/', onPostResponse);

module.exports = router;
