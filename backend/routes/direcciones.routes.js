module.exports = app => {
    const direcciones = require("../controllers/direcciones.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", direcciones.create);
  
    router.get("/", direcciones.findAll);
  
    router.get("/:id", direcciones.findOne);
  /*
    router.put("/:id", direcciones.update);
  
    router.delete("/:id", direcciones.delete);
  */
    app.use('/api/direcciones', router);
  };