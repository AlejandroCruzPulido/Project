const db = require("../models");
const Contienen = db.contienen;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.estadoEnvio) {
    res.status(400).send({
      message: "El contenido no puede estar vacio!"
    });
  }

  const contienen = {
    id_compras: req.body.id_compras,
    id_gafas: req.body.id_gafas,
    metodoPago: req.body.metodoPago,
    fecha: req.body.fecha
  }

  Contienen.create(contienen).then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Han ocurrido algunos errores creando los datos"
    })
  });
};

exports.findAll = (req, res) => {
  Contienen.findAll().then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Han ocurrido algunos errores recogiendo todos los datos"
    })
  })
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  Contienen.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `El id=${id} no se pudo encontrar`
        });
      }
    }).catch(err => {
      res.status(500).send({
        message: "Error recogiendo los datos con id=" + id
      });
    });
};