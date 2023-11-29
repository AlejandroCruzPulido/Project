const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require("./models");
const User = db.users;
const utils = require('./utils'); 

function generateToken(user) {
  if (!user) return null;

  const { id, name, email, role } = user;

  return jwt.sign({ id, name, email, role }, process.env.JWT_SECRET, {
    expiresIn: 60 * 60 * 24
  });
}

function getCleanUser(user) {
  if (!user) return null;

  const { id, name, email, role } = user;

  return { id, name, email, role };
}

module.exports = {
  generateToken,
  getCleanUser
};