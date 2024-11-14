module.exports = (app) => {
  const interestResume = require("../controllers/interestResume.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  router.post("/", [authenticate], interestResume.create);
  router.get("/:id", [authenticate], interestResume.findByResume);
  router.put("/:interestResumeId", [authenticate], interestResume.update);
  router.delete("/:interestResumeId", [authenticate], interestResume.delete);

  app.use("/resume-t2/interestResume", router);
};