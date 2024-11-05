module.exports = (app) => {
  const award = require("../controllers/awards.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  router.post("/", [authenticate], award.create);
  // router.get("/", [authenticate], award.findAll);
  // router.get("/:id", [authenticate], award.findOne);
  // router.put("/:id", [authenticate], award.update);
  // router.delete("/:id", [authenticate], award.delete);

  app.use("/award", router);
};
