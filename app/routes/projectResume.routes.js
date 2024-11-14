module.exports = (app) => {
  const projectResume = require("../controllers/projectResume.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  router.post("/", [authenticate], projectResume.create);
  router.get("/:id", [authenticate], projectResume.findByResume);
  router.put("/:projectResumeId", [authenticate], projectResume.update);
  router.delete("/:projectResumeId", [authenticate], projectResume.delete);

  app.use("/projectResume", router);
};