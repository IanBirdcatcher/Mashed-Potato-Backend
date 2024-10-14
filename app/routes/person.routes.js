module.exports = (app) => {
    const persons = require("../controllers/person.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();
  
    router.post("/", [authenticate], persons.create);
    router.get("/", [authenticate], persons.findAll);
    router.get("/:id", [authenticate], persons.findOne);
    router.put("/:id", [authenticate], persons.update);
    router.delete("/:id", [authenticate], persons.delete);
  
    app.use("/person", router);
  };
  