const db = require("../models");
const Users = db.users;
const bcrypt = require('bcryptjs');
const utils = require("../utils");

exports.create = (req, res) => {
  if (!req.body.name || !req.body.surname || !req.body.email || !req.body.password || !req.body.role) {
    res.status(400).send({
      message: "Content cannot be empty!"
    });
    return;
  }

  const user = {
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password),
    role: req.body.role
  };

  Users.create(user)
    .then(data => {
      const token = utils.generateToken(data);
      const userObj = utils.getCleanUser(data);
      return res.json({ user: userObj, access_token: token });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User."
      });
    });
};

exports.findAll = (req, res) => {
  Users.findAll().then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving all Users"
    })
  })
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  Users.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find User with id=${id}.`
        });
      }
    }).catch(err => {
      res.status(500).send({
        message: "Error retrieving User with id=" + id
      });
    });
};

exports.update = (req, res) => {
  const user = {
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role
  }

  Users.update(user, { 
    where: { id: req.params.id } 
  }).then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: err.message || `Some error occurred while updating the user with id=${req.params.id}`
    })
  });
};

exports.delete = (req, res) => {
  Users.destroy({ 
    where: { id: req.params.id } 
  }).then(() => {
    res.status(200).send({
      message: "User deleted!"
    });
  }).catch(err => {
    res.status(500).send({
      message: err.message || `Some error occurred while deleting the user with id=${req.params.id}`
    });
  });
}
