const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require("./models");
const User = db.users;
const utils = require('./utils'); 

function generateToken(user) {
  if (!user) return null;

  const { id, username, name, surname, email, password, role } = user;

  return jwt.sign({ id, username, name, surname, email, password, role }, process.env.JWT_SECRET, {
    expiresIn: 60 * 60 * 24
  });
}

function getCleanUser(user) {
  if (!user) return null;

  const { id, username, name, surname, email, password, role } = user;

  return { id, username, name, surname, email, password, role };
}

module.exports = {
  generateToken,
  getCleanUser
};