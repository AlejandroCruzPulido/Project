const db = require("../models");
const Users = db.users;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.name || !req.body.surname || !req.body.email || !req.body.password) {
    res.status(400).send({
      message: "Content cannot be empty!"
    });
  }

  const user = {
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    password: req.body.password,
  }

  Users.create(user).then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the User"
    })
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