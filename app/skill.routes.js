module.exports = (app) => {
    const skills = require("../controllers/skill.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();
  
    router.post("/", [authenticate], skills.create);
    router.get("/", [authenticate], skills.findAll);
    router.get("/:id", [authenticate], skills.findOne);
    router.put("/:id", [authenticate], skills.update);
    router.delete("/:id", [authenticate], skills.delete);
  
    app.use("/skill", router);
  };
  