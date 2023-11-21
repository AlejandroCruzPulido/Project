const db = require("../models");
const Buys = db.buys;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.orderState || !req.body.id_user) {
    res.status(400).send({
      message: "Content cannot be empty!"
    });
  }

  const buy = {
    orderState: req.body.orderState,
    id_user: req.body.id_user,
  }

  Buys.create(buy).then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Buy"
    })
  });
};

exports.findAll = (req, res) => {
  Buys.findAll().then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving all Buys"
    })
  })
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  Buys.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Buy with id=${id}.`
        });
      }
    }).catch(err => {
      res.status(500).send({
        message: "Error retrieving Buy with id=" + id
      });
    });
};