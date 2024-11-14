module.exports = (app) => {
    const contactInfo = require("../controllers/contactInfo.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();
  
    router.post("/", [authenticate], contactInfo.create);
    router.get("/byUser/:id", [authenticate], contactInfo.findAllForUser);
    router.get("/:id", [authenticate], contactInfo.findOne);
    router.put("/:id", [authenticate], contactInfo.update);
    router.delete("/:id", [authenticate], contactInfo.delete);
  
    app.use("/resume-t2/contactInfo", router);
};
  