const db = require("../models");
const Gafas = db.gafas;
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
    imagen: req.file ? req.file.imagen : ""
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
/*
exports.update = (req, res) => {
  const id = req.params.id;

  Gafas.findByPk(id)
    .then(gafas => {
      if (!gafas) {
        return res.status(404).send({
          message: `No se han encontrado las Gafas con id=${id} .`
        });
      }

      if (req.file) {
        if (gafas.imagen) {
          eliminarImagenDesdeCarpeta(gafas.imagen);
        }
        
        gafas.imagen = req.file.imagen;
      }

      gafas.color = req.body.color;
      gafas.cristal = req.body.cristal;
      gafas.montura = req.body.montura;
      gafas.precio = req.body.precio;
      gafas.categoria = req.body.categoria;
      gafas.stock = req.body.stock;

      gafas.save()
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
  Gafas.findByPk(id)
    .then(gafas => {
      if (!gafas) {
        return res.status(404).send({
          message: `No se ha encontrado la Gafa con id=${id}.`
        });
      }

      const imageName = gafas.imagen;

      const imagePath = path.resolve(__dirname, '..', 'public', 'images', imageName);
      console.log('Ruta de la imagen:', imagePath);
      
      Gafas.destroy({
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