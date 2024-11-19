module.exports = (app) => {
  const user = require("../controllers/user.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();


  //user Routes
  router.post("/", [authenticate], user.create);
  router.get("/", [authenticate], user.findAll);
  router.get("/:id", [authenticate], user.findOne);
  router.put("/:id", [authenticate], user.update);
  router.delete("/:id", [authenticate], user.delete);

  //admin routes
  router.get("/admins", [authenticate], user.findAdmins);
  router.post("/admins", [authenticate], user.addAdmin);
  app.use("/resume-t2/user", router);
};