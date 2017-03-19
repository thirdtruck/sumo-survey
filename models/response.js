function exports(sequelize, DataTypes) {
  const Response = sequelize.define('Response', {
    GuestId: DataTypes.UUID,
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here

        models.Response.belongsTo(models.Guest);
        models.Response.belongsTo(models.Question);
        models.Response.belongsTo(models.Choice);
      },
    },
  });
  return Response;
}

module.exports = exports;
