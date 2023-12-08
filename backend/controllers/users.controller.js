const db = require("../models");
const Users = db.users;
const bcrypt = require('bcryptjs');
const utils = require("../utils"); 

exports.create = (req, res) => {
  if (!req.body.username || !req.body.email || !req.body.password) {
    res.status(400).send({
      message: "Content cannot be empty!"
    });
    return;
  }

  const user = {
    username: req.body.username,
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password),
    role: req.body.role || "Cliente"
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

// users.controller.js
exports.findAll = async (req, res) => {
  try {
    console.log("Finding all users...");
    
    // Verificamos si el middleware de autenticación está pasando correctamente.
    console.log("Authenticated user:", req.user);

    // Consultamos todos los usuarios.
    const data = await Users.findAll();
    
    // Enviamos los datos como respuesta.
    res.send(data);
  } catch (error) {
    console.error("Error in protected route:", error);

    // Verificamos el tipo de error y enviamos una respuesta adecuada.
    if (error.name === "JsonWebTokenError") {
      res.status(401).json({
        error: true,
        message: "Invalid token.",
        details: error.message,
      });
    } else {
      res.status(500).send({
        message: error.message || "Some error occurred while retrieving all Users",
      });
    }
  }
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

exports.findCurrentUser = (req, res) => {
  const id = req.user.id;

  Users.findByPk(id)
    .then(data => {
      if (data) {
        const userObj = utils.getCleanUser(data);
        res.json(userObj);
      } else {
        res.status(404).send({
          message: `Cannot find User with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving current user data."
      });
    });
};

exports.update = (req, res) => {
  const user = {
    username: req.body.name,
    name: req.body.name,
    surname: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password),
    role: req.body.role
  };

  Users.update(user, { 
    where: { id: req.params.id } 
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || `Some error occurred while updating the user with id=${req.params.id}`
      });
    });
};

exports.delete = (req, res) => {
  Users.destroy({ 
    where: { id: req.params.id } 
  })
    .then(() => {
      res.status(200).send({
        message: "User deleted!"
      });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || `Some error occurred while deleting the user with id=${req.params.id}`
      });
    });
};