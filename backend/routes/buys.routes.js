module.exports = app => {
    const buys = require("../controllers/buys.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", buys.create);
  
    router.get("/", buys.findAll);
  
    router.get("/:id", buys.findOne);
  
    router.put("/:id", buys.update);
  
    // router.delete("/:id", buys.delete);
  
    app.use('/api/buys', router);
  };