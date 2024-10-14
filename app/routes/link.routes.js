module.exports = (app) => {
    const links = require("../controllers/link.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();
  
    router.post("/", [authenticate], links.create);
    router.get("/", [authenticate], links.findAll);
    router.get("/:id", [authenticate], links.findOne);
    router.put("/:id", [authenticate], links.update);
    router.delete("/:id", [authenticate], links.delete);
  
    app.use("/link", router);
  };
  