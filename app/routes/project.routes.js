module.exports = (app) => {
    const project = require("../controllers/project.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();
  
    router.post("/", [authenticate], project.create);
    router.get("/", [authenticate], project.findAll);
    router.get("/:id", [authenticate], project.findOne);
    router.get("/byUser/:id", [authenticate], project.findAllForUser);
    router.put("/:id", [authenticate], project.update);
    router.delete("/:id", [authenticate], project.delete);
    router.delete("/byUser/:id", [authenticate], project.deleteForUser)

    app.use("/project", router);
  };
  