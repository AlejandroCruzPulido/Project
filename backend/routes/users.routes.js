module.exports = app => {
  const users = require("../controllers/users.controller.js");
  const auth = require("../controllers/auth.js");

  var router = require("express").Router();

  router.post("/", users.create);

  router.get("/", auth.isAuthenticated, users.findAll);

  router.get("/current", auth.isAuthenticated, users.findCurrentUser);

  router.get("/:id", auth.isAuthenticated, users.findOne);

  router.put("/:id", auth.isAuthenticated, users.update);

  router.delete("/:id", auth.isAuthenticated, users.delete);

  router.post("/signin", auth.signin);

  app.use('/api/users', router);
};
