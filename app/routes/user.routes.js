module.exports = (app) => {
  const admins = require("../controllers/admin.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  router.post("/", [authenticate], user.create);
  router.get("/", [authenticate], user.findAll);
  router.get("/:id", [authenticate], user.findOne);
  router.put("/:id", [authenticate], user.update);
  router.delete("/:id", [authenticate], user.delete);

  app.use("/user", router);
};