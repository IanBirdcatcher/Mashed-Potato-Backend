module.exports = (app) => {
  const contactInfoResume = require("../controllers/contactInfoResume.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  router.post("/", [authenticate], contactInfoResume.create);
  router.get("/:id", [authenticate], contactInfoResume.findByResume);
  router.put("/:contactInfoResumeId", [authenticate], contactInfoResume.update);
  router.delete("/:contactInfoResumeId", [authenticate], contactInfoResume.delete);

  app.use("/resume-t2/contactInfoResume", router);
};