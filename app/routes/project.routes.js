module.exports = (app) => {
    const projects = require("../controllers/project.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();
  
    router.post("/", [authenticate], projects.create);
    router.get("/", [authenticate], projects.findAll);
    router.get("/:id", [authenticate], projects.findOne);
    router.put("/:id", [authenticate], projects.update);
    router.delete("/:id", [authenticate], projects.delete);
  
    app.use("/project", router);
  };
  