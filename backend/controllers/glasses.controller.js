const db = require("../models");
const Glasses = db.glasses;
const Op = db.Sequelize.Op;
/*
const fs = require('fs');
const path = require('path');

const eliminarImagenDesdeCarpeta = (imageName) => {
  const imagePath = path.join(__dirname, '..', 'public', 'images', imageName);
  console.log('Ruta de la imagen:', imagePath);

  if (fs.existsSync(imagePath)) {
    fs.unlinkSync(imagePath);
    console.log(`Imagen ${imageName} eliminada con éxito.`);
  } else {
    console.log(`La imagen ${imageName} no existe en la carpeta de almacenamiento.`);
  }
};
*/
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
    image: req.file ? req.file.image : ""
  }

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
/*
exports.update = (req, res) => {
  const id = req.params.id;

  Glasses.findByPk(id)
    .then(gafas => {
      if (!glasses) {
        return res.status(404).send({
          message: `No se han encontrado las Gafas con id=${id} .`
        });
      }

      if (req.file) {
        if (glasses.image) {
          eliminarImagenDesdeCarpeta(glasses.image);
        }
        
        glasses.image = req.file.image;
      }

      glasses.color = req.body.color;
      glasses.glass = req.body.glass;
      glasses.mount = req.body.mount;
      glasses.price = req.body.price;
      glasses.category = req.body.category;
      glasses.stock = req.body.stock;

      glasses.save()
        .then(() => {
          res.send({
            message: "Se ha actualizado la Gafa correctamente."
          });
        })
        .catch(err => {
          res.status(500).send({
            message: "Error al catualizar la Gafa con id=" + id
          });
        });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error encontrando la Gafa con id=" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  Glasses.findByPk(id)
    .then(glasses => {
      if (!glasses) {
        return res.status(404).send({
          message: `No se ha encontrado la Gafa con id=${id}.`
        });
      }

      const imageName = glasses.image;

      const imagePath = path.resolve(__dirname, '..', 'public', 'images', imageName);
      console.log('Ruta de la imagen:', imagePath);
      
      Glasses.destroy({
        where: { id: id }
      }).then(num => {
        if (num == 1) {
          if (imagePath) {
            eliminarImagenDesdeCarpeta(imageName); 
          }

          res.send({
            message: "La Gafa y la imagen asociada han sido eliminadas con exito."
          });
        } else {
          res.send({
            message: `No se puede eliminar el coche con id=${id}.`
          });
        }
      });
    })
    .catch(err => {
      res.status(500).send({
        message: "No es posible eliminar la Gafa con id=" + id
      });
    });
};
*/