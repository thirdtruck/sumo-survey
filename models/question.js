function exports(sequelize, DataTypes) {
  const Question = sequelize.define('Question', {
    title: DataTypes.TEXT,
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here

        models.Question.hasMany(models.Choice);
        models.Question.hasMany(models.Response);
      },
    },
  });
  return Question;
}

module.exports = exports;
