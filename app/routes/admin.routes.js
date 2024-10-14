module.exports = (app) => {
  const admins = require("../controllers/admin.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  router.post("/", [authenticate], admins.create);
  router.get("/", [authenticate], admins.findAll);
  router.get("/:id", [authenticate], admins.findOne);
  router.put("/:id", [authenticate], admins.update);
  router.delete("/:id", [authenticate], admins.delete);

  app.use("/admin", router);
};
