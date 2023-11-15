module.exports = app => {
  const gafas = require("../controllers/gafas.controller.js");
  var upload = require('../multer/upload');

  var router = require("express").Router();

  router.post("/", upload.single('file'), gafas.create);

  router.get("/", gafas.findAll);

  router.get("/:id", gafas.findOne);

  router.put("/:id", upload.single('file'), gafas.update);

  router.delete("/:id", gafas.delete);

  app.use('/api/gafas', router);
};