module.exports = (app) => {
  const awardResume = require("../controllers/awardResume.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  router.post("/", [authenticate], awardResume.create);
  router.get("/:id", [authenticate], awardResume.findByResume);
  router.put("/:awardResumeId", [authenticate], awardResume.update);
  router.delete("/:awardResumeId", [authenticate], awardResume.delete);

  app.use("/awardResume", router);
};