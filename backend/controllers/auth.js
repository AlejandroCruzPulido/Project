// auth.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require("../models");
const User = db.users; 
const utils = require('../utils');

exports.signin = (req, res) => {
  const user = req.body.username;
  const pwd = req.body.password;

  if (!user || !pwd) {
    return res.status(400).json({
      error: true,
      message: "Username or Password required."
    });
  }

  User.findOne({ where: { email: user } }) 
    .then(data => {
      const result = bcrypt.compareSync(pwd, data.password);
      if(!result) return  res.status(401).send('Password not valid!');

      const token = utils.generateToken(data);
      const userObj = utils.getCleanUser(data);
      return res.json({ user: userObj, access_token: token });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while signing in."
      });
    });
};

exports.isAuthenticated = (req, res, next) => {
  const token = req.token;
  if (!token) {
    return res.status(400).json({
      error: true,
      message: "Token is required."
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
    if (err) return res.status(401).json({
      error: true,
      message: "Invalid token."
    });

    User.findByPk(user.id)
      .then(data => {
        if (!data) {
          return res.status(401).json({
            error: true,
            message: "Invalid user."
          });
        }
        req.user = user;
        next();
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving User with id=" + user.id
        });
      });
  });
};
