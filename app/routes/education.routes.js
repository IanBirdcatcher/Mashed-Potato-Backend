module.exports = (app) => {
  const education = require("../controllers/education.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  router.post("/", [authenticate], education.create);
  router.get("/:id", [authenticate], education.findOne);
  router.get("/byUser/:id", [authenticate], education.findAllForUser);
  router.put("/:id", [authenticate], education.update);
  router.delete("/:id", [authenticate], education.delete);
  app.use("/education", router);
};
  