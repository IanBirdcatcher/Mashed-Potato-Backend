module.exports = (app) => {
  const experienceResume = require("../controllers/experienceResume.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  router.post("/", [authenticate], experienceResume.create);
  router.get("/:id", [authenticate], experienceResume.findByResume);
  router.put("/:experienceResumeId", [authenticate], experienceResume.update);
  router.delete("/:experienceResumeId", [authenticate], experienceResume.delete);

  app.use("/experienceResume", router);
};