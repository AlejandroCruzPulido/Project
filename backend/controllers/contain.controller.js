const db = require("../models");
const Contain = db.contain;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.paymentMethod ) {
    res.status(400).send({
      message: "Content cannot be empty!"
    });
  }

  const contain = {
    id_buys: req.body.id_buys,
    id_glasses: req.body.id_glasses,
    paymentMethod: req.body.paymentMethod,
    date: req.body.date
  }

  Contain.create(contain).then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while creating"
    })
  });
};

exports.findAll = (req, res) => {
  Contain.findAll().then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving all"
    })
  })
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  Contain.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find the id=${id}.`
        });
      }
    }).catch(err => {
      res.status(500).send({
        message: "Error retrieving the id=" + id
      });
    });
};

exports.update = (req, res) => {
  const contain = {
    id_buys: req.body.id_buys,
    id_glasses: req.body.id_glasses,
    paymentMethod: req.body.paymentMethod,
    date: req.body.date
  }

  Contain.update(contain, { 
    where: { id: req.params.id } 
  }).then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: err.message || `Some error occurred while updating the contain with id=${req.params.id}`
    })
  });
};

exports.delete = (req, res) => {
  Contain.destroy({ 
    where: { id: req.params.id } 
  }).then(() => {
    res.status(200).send({
      message: "Contain deleted!"
    });
  }).catch(err => {
    res.status(500).send({
      message: err.message || `Some error occurred while deleting the contain with id=${req.params.id}`
    });
  });
}