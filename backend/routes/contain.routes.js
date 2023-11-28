module.exports = app => {
    const contain = require("../controllers/contain.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", contain.create);
  
    router.get("/", contain.findAll);
  
    router.get("/:id", contain.findOne);
  
    router.put("/:id", contain.update);
  
    router.delete("/:id", contain.delete);
    app.use('/api/contain', router);
  };