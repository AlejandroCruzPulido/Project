const db = require("../models");
const Users = db.users;
const bcrypt = require('bcryptjs');
const utils = require("../utils"); 

exports.create = async (req, res) => {
  try{
    if (!req.body.username || !req.body.email || !req.body.password) {
      res.status(400).send({
        message: "Content cannot be empty!"
      });
      return;
    }

    const userRole = req.body.role || "Client";

    const user = {
      username: req.body.username,
      name: req.body.name,
      surname: req.body.surname,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password),
      role: userRole
    };

    const data = await Users.create(user);
    const token = utils.generateToken(data);
    const userObj = utils.getCleanUser(data);
    res.json({ user: userObj, access_token: token });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).send({
      message: error.message || "Some error occurred while creating the User."
    });
  }
};

exports.findAll = async (req, res) => {
  try {
    console.log("Finding all users...");
    
    console.log("Authenticated user:", req.user);

    const data = await Users.findAll();
    
    res.send(data);
  } catch (error) {
    console.error("Error in protected route:", error);

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

exports.update = async (req, res) => {
  try {
    const userId = req.params.id;
    const existingUser = await Users.findByPk(userId);

    if (!existingUser) {
      return res.status(404).send({
        message: `Cannot find User with id=${userId}.`,
      });
    }

    const updatedUser = {
      username: req.body.username || existingUser.username,
      name: req.body.name || existingUser.name,
      surname: req.body.surname || existingUser.surname,
      email: req.body.email || existingUser.email,
      password: req.body.newPassword
        ? bcrypt.hashSync(req.body.newPassword)
        : existingUser.password,
      role: req.body.role || existingUser.role,
    };

    await Users.update(updatedUser, { where: { id: userId } });

    res.send(updatedUser);
  } catch (error) {
    res.status(500).send({
      message: `Error updating user with id=${req.params.id}: ${error.message}`,
    });
  }
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