module.exports = (app) => {
  const link = require("../controllers/link.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  router.post("/", [authenticate], link.create);
  router.get("/", [authenticate], link.findAll);
  router.get("/:id", [authenticate], link.findOne);
  router.get("/byUser/:id", [authenticate], link.findAllForUser);
  router.put("/:id", [authenticate], link.update);
  router.delete("/:id", [authenticate], link.delete);
  router.delete("/byUser/:id", [authenticate], link.deleteForUser)

  app.use("/resume-t2/link", router);
};
