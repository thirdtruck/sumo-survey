function exports(sequelize, DataTypes) {
  const Choice = sequelize.define('Choice', {
    text: DataTypes.TEXT,
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here

        models.Choice.belongsTo(models.Question);
        models.Choice.hasMany(models.Response);
      },
    },
  });
  return Choice;
}

module.exports = exports;
