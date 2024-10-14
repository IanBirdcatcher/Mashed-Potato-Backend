module.exports = (app) => {
    const resumeItems = require("../controllers/resumeItem.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();
  
    router.post("/", [authenticate], resumeItems.create);
    router.get("/", [authenticate], resumeItems.findAll);
    router.get("/:id", [authenticate], resumeItems.findOne);
    router.put("/:id", [authenticate], resumeItems.update);
    router.delete("/:id", [authenticate], resumeItems.delete);
  
    app.use("/resumeItem", router);
  };
  