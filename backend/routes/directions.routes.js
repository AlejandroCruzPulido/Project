module.exports = app => {
    const directions = require("../controllers/directions.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", directions.create);
  
    router.get("/", directions.findAll);
  
    router.get("/:id", directions.findOne);
  
    router.put("/:id", directions.update);
  
    router.delete("/:id", directions.delete);
  
    app.use('/api/directions', router);
  };