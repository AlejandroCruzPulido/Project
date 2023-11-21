const db = require("../models");
const Glasses = db.glasses;
const Op = db.Sequelize.Op;

const path = require('path');
const fs = require('fs');

exports.create = (req, res) => {
  if (!req.body.color || !req.body.glass || !req.body.mount || !req.body.price) {
    res.status(400).send({
      message: "Content cannot be empty!"
    });
  }

  const glasses = {
    color: req.body.color,
    glass: req.body.glass,
    mount: req.body.mount,
    price: req.body.price,
    category: req.body.category,
    stock: req.body.stock,
    image: req.file ? req.file.filename : ""
  };  

  Glasses.create(glasses).then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Glasses"
    })
  });
};

exports.findAll = (req, res) => {
  Glasses.findAll().then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving all Glasses"
    })
  })
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  Glasses.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Glasses with id=${id}.`
        });
      }
    }).catch(err => {
      res.status(500).send({
        message: "Error retrieving Glasses with id=" + id
      });
    });
};

exports.update = async (req, res) => {
  try {
    let id = req.params.id;
    console.log(req.body);
    let glasses = {
      color: req.body.color,
      glass: req.body.glass,
      mount: req.body.mount,
      price: req.body.price,
      category: req.body.category,
      stock: req.body.stock,
    };

    const existingGlasses = await Glasses.findByPk(id);
    if (!existingGlasses) {
      return res.status(404).send({
        message: `Cannot find Glasses with id=${id}.`
      });
    }

    if (existingGlasses.image) {
      const imagePath = path.join(__dirname, '../public/images', existingGlasses.image);
      fs.unlinkSync(imagePath);
    }
    
    if (req.file) {
      const img = req.file.path;
      glasses.image = img;
    }

    await Glasses.update(glasses, {
      where: { id: id }
    });

    res.status(200).send("Glasses updated");
  } catch (err) {
    res.status(500).send({
      message: "Error to update the glasses"
    });
  }
};
