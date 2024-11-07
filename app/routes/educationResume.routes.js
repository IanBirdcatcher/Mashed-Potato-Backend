module.exports = (app) => {
  const educationResume = require("../controllers/educationResume.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  router.post("/", [authenticate], educationResume.create);
  router.get("/:id", [authenticate], educationResume.findByResume);
  router.put("/:educationResumeId", [authenticate], educationResume.update);
  router.delete("/:educationResumeId", [authenticate], educationResume.delete);

  app.use("/educationResume", router);
};