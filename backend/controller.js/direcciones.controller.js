const db = require("../models");
const Direccion = db.direcciones;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.direccion) {
    res.status(400).send({
      message: "El contenido no puede estar vacio!"
    });
  }

  const direcciones = {
    direccion: req.body.direccion
  }

  Direccion.create(direcciones).then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Han ocurrido algunos errores creando las Direcciones"
    })
  });
};

exports.findAll = (req, res) => {
  Direccion.findAll().then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Han ocurrido algunos errores recogiendo todas las Direcciones"
    })
  })
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  Direccion.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `No se puede encontrar las Direcciones con id=${id}.`
        });
      }
    }).catch(err => {
      res.status(500).send({
        message: "Error recogiendo las Direcciones con id=" + id
      });
    });
};