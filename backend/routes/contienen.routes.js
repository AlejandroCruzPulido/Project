module.exports = app => {
    const contienen = require("../controllers/contienen.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", contienen.create);
  
    router.get("/", contienen.findAll);
  
    router.get("/:id", contienen.findOne);
  /*
    router.put("/:id", contienen.update);
  
    router.delete("/:id", contienen.delete);
  */
    app.use('/api/contienen', router);
  };