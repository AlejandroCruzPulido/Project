const db = require("../models");
const Compras = db.compras;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.estadoEnvio) {
    res.status(400).send({
      message: "El contenido no puede estar vacio!"
    });
  }

  const compras = {
    estadoEnvio: req.body.estadoEnvio
  }

  Compras.create(compras).then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Han ocurrido algunos errores creando las Compras"
    })
  });
};

exports.findAll = (req, res) => {
  Compras.findAll().then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Han ocurrido algunos errores recogiendo todas las Compras"
    })
  })
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  Compras.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `No se puede encontrar las Compras con id=${id}.`
        });
      }
    }).catch(err => {
      res.status(500).send({
        message: "Error recogiendo las Compras con id=" + id
      });
    });
};