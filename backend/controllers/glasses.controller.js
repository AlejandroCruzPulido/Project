const db = require("../models");
const Glasses = db.glasses;
const Op = db.Sequelize.Op;

const path = require('path');
const fs = require('fs');

exports.create = (req, res) => {
  if (!req.body.price || !req.body.category || !["men", "women", "kids"].includes(req.body.category)){
    res.status(400).send({
      message: "Content cannot be empty!"
    });
    return;
  }

  const glasses = {
    name: req.body.name,
    price: req.body.price,
    category: req.body.category,
    stock: req.body.stock,
    image: req.file ? req.file.filename : ""
  };  

  Glasses.create(glasses)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Glasses"
      });
    });
};

exports.findAll = async (req, res) => {
  try {
    const condition = {};
    
    if (req.query.search && req.query.search !== 'undefined') {
      condition.name = { [Op.like]: `%${req.query.search}%` };
    }

    if (req.query.category && req.query.category !== 'undefined' && req.query.category !== 'all') {
      condition.category = req.query.category;
    }

    const data = await Glasses.findAll({
      where: condition
    });

    const glassesWithStock = data.map(gafa => ({
      ...gafa.dataValues,
      hasStock: gafa.stock === 1
    }));

    res.send(glassesWithStock);
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Internal server error"
    });
  }
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
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Glasses with id=" + id
      });
    });
};

exports.findCategories = (req, res) => {
  Glasses.findAll({
    attributes: [[db.Sequelize.fn('DISTINCT', db.Sequelize.col('category')), 'category']],
  })
    .then(data => {
      const categories = data.map(item => item.category);
      res.send(categories);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving categories",
      });
    });
};

exports.update = async (req, res) => {
  try {
    let id = req.params.id;
    console.log(req.body);
    let glasses = {
      name: req.body.name,
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
    if (existingGlasses.image && req.file) {
      const imagePath = path.join(__dirname, '../public/images', existingGlasses.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      } else {
        console.warn("Image file does not exist:", imagePath);
      }
    }

    if (req.file) {
      const img = req.file.filename;
      glasses.image = img;

      console.log("New image path:", path.join(__dirname, '../public/images', img));
    } else {
      glasses.image = existingGlasses.image;
    }

    console.log("Existing image path:", path.join(__dirname, '../public/images', existingGlasses.image));

    await Glasses.update(glasses, {
      where: { id: id }
    });

    res.status(200).send("Glasses updated");
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: "Error updating the glasses"
    });
  }
};

exports.delete = async (req, res) => {
  try {
    let id = req.params.id;
    const existingGlasses = await Glasses.findByPk(id);

    if (!existingGlasses) {
      return res.status(404).send({
        message: `Cannot find Glasses with id=${id}.`
      });
    }

    try {
      if (existingGlasses.image) {
        const imagePath = path.join(__dirname, '../public/images', existingGlasses.image);
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
          console.log("Image file deleted:", imagePath);
        } else {
          console.warn("Image file does not exist:", imagePath);
        }
      }
    } catch (err) {
      console.error("Error deleting image file:", err);
    }

    await Glasses.destroy({ where: { id: id } });
    res.status(200).json("Glasses has been deleted.");
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: "Error deleting the glasses"
    });
  }
};