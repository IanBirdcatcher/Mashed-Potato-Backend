module.exports = (app) => {
  const skillResume = require("../controllers/skillResume.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  router.post("/", [authenticate], skillResume.create);
  router.get("/:id", [authenticate], skillResume.findByResume);
  router.put("/:skillResumeId", [authenticate], skillResume.update);
  router.delete("/:skillResumeId", [authenticate], skillResume.delete);

  app.use("/resume-t2/skillResume", router);
};