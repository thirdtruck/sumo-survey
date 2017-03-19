'use strict';
module.exports = function(sequelize, DataTypes) {
  var Guest = sequelize.define('Guest', {
    sessionId: DataTypes.UUID
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here

        models.Guest.hasMany(models.Response);
      }
    }
  });
  return Guest;
};
