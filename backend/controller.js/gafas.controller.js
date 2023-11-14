const db = require("../models");
const Gafas = db.gafas;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.color || !req.body.cristal || !req.body.montura || !req.body.precio) {
    res.status(400).send({
      message: "El contenido no puede estar vacio!"
    });
  }

  const gafas = {
    color: req.body.color,
    cristal: req.body.cristal,
    montura: req.body.montura,
    precio: req.body.precio,
    categoria: req.body.categoria,
    stock: req.body.stock,
  }

  Gafas.create(gafas).then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Han ocurrido algunos errores creando las Gafas"
    })
  });
};

exports.findAll = (req, res) => {
  Gafas.findAll().then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Han ocurrido algunos errores recogiendo todas las Gafas"
    })
  })
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  Gafas.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `No se puede encontrar las Gafas con id=${id}.`
        });
      }
    }).catch(err => {
      res.status(500).send({
        message: "Error recogiendo las Gafas con id=" + id
      });
    });
};