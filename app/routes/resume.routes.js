module.exports = (app) => {
    const resumes = require("../controllers/resume.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();
  
    router.post("/", [authenticate], resumes.create);
    router.get("/", [authenticate], resumes.findAll);
    router.get("/:id", [authenticate], resumes.findOne);
    router.put("/:id", [authenticate], resumes.update);
    router.delete("/:id", [authenticate], resumes.delete);
  
    app.use("/resume", router);
  };
  