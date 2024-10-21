module.exports = (app) => {
    const interests = require("../controllers/interest.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();
  
    router.post("/", [authenticate], interests.create);
    router.get("/", [authenticate], interests.findAll);
    router.get("/:id", [authenticate], interests.findOne);
    router.put("/:id", [authenticate], interests.update);
    router.delete("/:id", [authenticate], interests.delete);
  
    app.use("/interest", router);
  };
  