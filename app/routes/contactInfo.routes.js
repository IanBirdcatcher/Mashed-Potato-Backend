module.exports = (app) => {
    const contactInfo = require("../controllers/contactInfo.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();
  
    router.post("/", [authenticate], contactInfo.create);
    router.get("/", [authenticate], contactInfo.findAll);
    router.get("/:userid", [authenticate], contactInfo.findOne);
    router.put("/:id", [authenticate], contactInfo.update);
    router.delete("/:id", [authenticate], contactInfo.delete);
  
    app.use("/contactInfo", router);
  };
  