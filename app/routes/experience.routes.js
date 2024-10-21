module.exports = (app) => {
    const experience = require("../controllers/experience.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();
  
    router.post("/", [authenticate], experience.create);
    router.get("/", [authenticate], experience.findAll);
    router.get("/:id", [authenticate], experience.findOne);
    router.put("/:id", [authenticate], experience.update);
    router.delete("/:id", [authenticate], experience.delete);
  
    app.use("/experience", router);
};
  