module.exports = (app) => {
    const education = require("../controllers/education.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();
  
    router.post("/", [authenticate], education.create);// you give the user id 
    router.get("/byUser/:id", [authenticate], education.findAllForUser);// you give the user id 
    router.get("/:id", [authenticate], education.findOne); 
    router.put("/:id", [authenticate], education.update); // you give the user id and educaton id
    router.delete("/:id", [authenticate], education.delete);
  
    app.use("/education", router);
  };
  