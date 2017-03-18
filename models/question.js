'use strict';
module.exports = function(sequelize, DataTypes) {
  var Question = sequelize.define('Question', {
    title: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here

        models.Question.hasMany(models.Choice);
        models.Question.hasMany(models.Response);
      }
    }
  });
  return Question;
};
