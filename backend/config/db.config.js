require('dotenv').config();

module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "",
  DB: "db_glasses",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
}

const { Sequelize } = require('sequelize');

module.exports = {
  development: {
    email: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    host: process.env.DB_HOST,
    dialect: 'mysql'
  },
  test: {
    email: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    host: process.env.DB_HOST,
    dialect: 'mysql'
  },
  production: {
    email: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    host: process.env.DB_HOST,
    dialect: 'mysql'
  }
};

module.exports.userModelConfig = (sequelize) => {
  const User = require('../models/users.model')(sequelize, Sequelize);
  return User;
};
