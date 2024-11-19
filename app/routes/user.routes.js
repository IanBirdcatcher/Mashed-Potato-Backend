module.exports = (app) => {
  const user = require("../controllers/user.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  router.post("/", [authenticate], user.create);
  router.get("/byEmail/:email", [authenticate], user.findByEmail);
  router.get("/:id", [authenticate], user.findOne);
  router.put("/:id", [authenticate], user.update);
  router.delete("/:id", [authenticate], user.delete);

  app.use("/resume-t2/user", router);
};