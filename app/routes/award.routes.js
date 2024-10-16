module.exports = (app) => {
  const awards = require("../controllers/award.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  router.post("/", [authenticate], awards.create);
  router.get("/", [authenticate], awards.findAll);
  router.get("/:id", [authenticate], awards.findOne);
  router.put("/:id", [authenticate], awards.update);
  router.delete("/:id", [authenticate], awards.delete);

  app.use("/award", router);
};
