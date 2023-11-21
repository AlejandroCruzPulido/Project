module.exports = app => {
  const glasses = require("../controllers/glasses.controller.js");
  var upload = require('../multer/upload.js');

  var router = require("express").Router();

  router.post("/", upload.single('file'), glasses.create);

  router.get("/", glasses.findAll);

  router.get("/:id", glasses.findOne);

  /*
  router.put("/:id", upload.single('file'), glasses.update);

  router.delete("/:id", glasses.delete);
  */
  app.use('/api/glasses', router);
};