const env = process.env.NODE_ENV || 'development';

const config = require('../config/config')[env];
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

let sequelize;

const basename = path.basename(module.filename);
const db = {};

if (config.use_env_variable) {
  console.log(`config.use_env_variable: ${config.use_env_variable}`);
  console.log(`process.env[config.use_env_variable]: ${process.env[config.use_env_variable]}`);
  sequelize = new Sequelize(process.env[config.use_env_variable], { logging: console.log });
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
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
