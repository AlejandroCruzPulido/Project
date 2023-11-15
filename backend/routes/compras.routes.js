module.exports = app => {
    const compras = require("../controllers/compras.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", compras.create);
  
    router.get("/", compras.findAll);
  
    router.get("/:id", compras.findOne);
  /*
    router.put("/:id", compras.update);
  
    router.delete("/:id", compras.delete);
  */
    app.use('/api/compras', router);
  };