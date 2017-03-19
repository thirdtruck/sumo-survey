'use strict';
module.exports = function(sequelize, DataTypes) {
  var Response = sequelize.define('Response', {
    GuestId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here

        models.Response.belongsTo(models.Guest);
        models.Response.belongsTo(models.Question);
        models.Response.belongsTo(models.Choice);
      }
    }
  });
  return Response;
};
