function exports(sequelize, DataTypes) {
  const Guest = sequelize.define('Guest', {
    sessionId: DataTypes.UUID,
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here

        models.Guest.hasMany(models.Response);
      },
    },
  });
  return Guest;
}

module.exports = exports;
