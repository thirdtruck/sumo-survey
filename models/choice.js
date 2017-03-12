'use strict';
module.exports = function(sequelize, DataTypes) {
  var Choice = sequelize.define('Choice', {
    text: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here

        models.Choice.belongsTo(models.Question);
        models.Choice.hasMany(models.Response);
      }
    }
  });
  return Choice;
};
