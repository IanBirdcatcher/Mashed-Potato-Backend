module.exports = (app) => {
    const skill = require("../controllers/skill.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();
  
    router.post("/", [authenticate], skill.create);
    router.get("/", [authenticate], skill.findAll);
    router.get("/:id", [authenticate], skill.findOne);
    router.get("/byUser/:id", [authenticate], skill.findAllForUser);
    router.put("/:id", [authenticate], skill.update);
    router.delete("/:id", [authenticate], skill.delete);
    router.delete("/byUser/:id", [authenticate], skill.deleteForUser)

    app.use("/resume-t2/skill", router);
  };
  