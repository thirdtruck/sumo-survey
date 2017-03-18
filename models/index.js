const env = process.env.NODE_ENV || 'development';

const config = require('../config/config')[env];
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const configDatabase = process.env.SURVEY_DATABASE || config.database;
const configUsername = process.env.SURVEY_USERNAME || config.username;
const configPassword = process.env.SURVEY_PASSWORD || config.password;

let sequelize;

const basename = path.basename(module.filename);
const db = {};

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  sequelize = new Sequelize(configDatabase, configUsername, configPassword, config);
}

function onlyJSFiles(file) {
  return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
}

function importModel(file) {
  const model = sequelize.import(path.join(__dirname, file));
  db[model.name] = model;
}

function assignAssociations(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
}

fs
  .readdirSync(__dirname)
  .filter(onlyJSFiles)
  .forEach(importModel);

Object.keys(db).forEach(assignAssociations);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
