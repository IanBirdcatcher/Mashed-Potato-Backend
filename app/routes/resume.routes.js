module.exports = (app) => {
    const resumes = require("../controllers/resume.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();
  
    router.post("/", [authenticate], resumes.create);
    router.get("/", [authenticate], resumes.findAll);
    router.get("/:id", [authenticate], resumes.findOne);
    router.get("/byUser/:id", [authenticate], resumes.findAllForUser)
    router.put("/:id", [authenticate], resumes.update);
    router.delete("/:id", [authenticate], resumes.delete);
    router.delete("/byUser/:id", [authenticate], resumes.deleteForUser);
  
    app.use("/resume-t2/resume", router); 
  };
  