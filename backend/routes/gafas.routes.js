module.exports = app => {
    const gafas = require("../controllers/gafas.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", gafas.create);
  
    router.get("/", gafas.findAll);
  
    router.get("/:id", gafas.findOne);
  
    router.put("/:id", gafas.update);
  
    router.delete("/:id", gafas.delete);
  
    app.use('/api/gafas', router);
  };