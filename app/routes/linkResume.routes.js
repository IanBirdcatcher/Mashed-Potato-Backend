module.exports = (app) => {
  const linkResume = require("../controllers/linkResume.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  router.post("/", [authenticate], linkResume.create);
  router.get("/:id", [authenticate], linkResume.findByResume);
  router.put("/:linkResumeId", [authenticate], linkResume.update);
  router.delete("/:linkResumeId", [authenticate], linkResume.delete);

  app.use("/linkResume", router);
};