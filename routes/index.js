const uuidV4 = require('uuid/v4');
const models = require('../models');
const express = require('express');

const router = express.Router();

function getOrCreateGuest(sessionUUID) {
  if (sessionUUID) {
    return models.Guest.find({
      where: { sessionId: sessionUUID },
    });
  }

  return models.Guest.create({
    sessionId: uuidV4(),
  });
}

function sortById(a, b) {
  return a.id - b.id;
}

function mapChoiceToJSON(choice) {
  return {
    id: choice.id,
    text: choice.text,
  };
}

function onGetIndex(req, res) {
  const session = req.session;

  function getRandomQuestionUnansweredByGuest(guest) {
    session.uuid = guest.sessionId;

    const queryString = `(SELECT QuestionId from Responses Where GuestId = ${guest.id})`;

    return models.Question.findOne({
      include: [{ model: models.Choice }],
      // Sequelize apparently doesn't support constructed subqueries yet or else we'd use one here
      // http://stackoverflow.com/questions/36164694/sequelize-subquery-in-where-clause
      where: {
        id: {
          // I assume we can trust guest.id to be a perfectly safe value (and no injection threat)
          // because of the database constraints
          $notIn: models.sequelize.literal(queryString),
        },
      },
      order: [
        [models.sequelize.fn('RAND')],
      ],
    });
  }

  function convertQuestionModelToJSONResponse(question) {
    if (!question) {
      return { title: 'No unanswered questions found' };
    }

    const choices = question.Choices;

    // TODO: Sort in query instead of here
    choices.sort(sortById);

    return {
      // TODO: In a real world app, I would use and expose UUIDs instead of DB row IDs
      id: question.id,
      title: question.title,
      choices: choices.map(mapChoiceToJSON),
    };
  }

  function renderResponse(question) {
    res.render('index', { question });
  }

  getOrCreateGuest(req.session.uuid)
  .then(getRandomQuestionUnansweredByGuest)
  .then(convertQuestionModelToJSONResponse)
  .then(renderResponse);
}

/* GET home page. */
router.get('/', onGetIndex);

module.exports = router;
