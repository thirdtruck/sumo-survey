'use strict';
module.exports = function(sequelize, DataTypes) {
  var Response = sequelize.define('Response', {
    GuestId: DataTypes.UUID
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here

        models.Response.belongsTo(models.Guest, { as: 'Response', foreignKey: 'GuestId' });
        models.Response.belongsTo(models.Question, { as: 'Response', foreignKey: 'QuestionId' });
        models.Response.belongsTo(models.Choice, { as: 'Response', foreignKey: 'ChoiceId' });
      }
    }
  });
  return Response;
};
