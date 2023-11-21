const db = require("../models");
const Direction = db.directions;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.direction || !req.body.id_user) {
    res.status(400).send({
      message: "Content cannot be empty!"
    });
  }

  const directions = {
    direction: req.body.direction,
    id_user: req.body.id_user
  }

  Direction.create(directions).then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Direction"
    })
  });
};

exports.findAll = (req, res) => {
  Direction.findAll().then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving all Directions"
    })
  })
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  Direction.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Direction with id=${id}.`
        });
      }
    }).catch(err => {
      res.status(500).send({
        message: "Error retrieving Direction with id=" + id
      });
    });
};

exports.update = (req, res) => {
  const direction = {
    direction: req.body.direction,
    id_user: req.body.id_user
  }

  Direction.update(direction, { 
    where: { id: req.params.id } 
  }).then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: err.message || `Some error occurred while updating the direction with id=${req.params.id}`
    })
  });
};

exports.delete = (req, res) => {
  Direction.destroy({ 
    where: { id: req.params.id } 
  }).then(() => {
    res.status(200).send({
      message: "Direction deleted!"
    });
  }).catch(err => {
    res.status(500).send({
      message: err.message || `Some error occurred while deleting the direction with id=${req.params.id}`
    });
  });
}