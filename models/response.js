function exports(sequelize, DataTypes) {
  const Response = sequelize.define('Response', {
    GuestId: DataTypes.UUID,
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here

        models.Response.belongsTo(models.Guest, { as: 'Response', foreignKey: 'GuestId' });
        models.Response.belongsTo(models.Question, { as: 'Response', foreignKey: 'QuestionId' });
        models.Response.belongsTo(models.Choice, { as: 'Response', foreignKey: 'ChoiceId' });
      },
    },
  });
  return Response;
}

module.exports = exports;
