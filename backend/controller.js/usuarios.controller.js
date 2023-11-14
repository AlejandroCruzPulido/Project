const db = require("../models");
const Usuarios = db.usuarios;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.nombre || !req.body.apellidos || !req.body.email || !req.body.password) {
    res.status(400).send({
      message: "El contenido no puede estar vacio!"
    });
  }

  const usuarios = {
    nombre: req.body.nombre,
    apellidos: req.body.apellidos,
    email: req.body.email,
    password: req.body.password,
  }

  Usuarios.create(usuarios).then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Han ocurrido algunos errores creando los Usuarios"
    })
  });
};

exports.findAll = (req, res) => {
  Usuarios.findAll().then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Han ocurrido algunos errores recogiendo todos los Usuarios"
    })
  })
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  Usuarios.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `No se puede encontrar los Usuarios con id=${id}.`
        });
      }
    }).catch(err => {
      res.status(500).send({
        message: "Error recogiendo los Usuarios con id=" + id
      });
    });
};