module.exports = (app) => {
  const interest = require("../controllers/interest.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  router.post("/", [authenticate], interest.create);
  router.get("/", [authenticate], interest.findAll);
  router.get("/:id", [authenticate], interest.findOne);
  router.get("/byUser/:id", [authenticate], interest.findAllForUser);
  router.put("/:id", [authenticate], interest.update);
  router.delete("/:id", [authenticate], interest.delete);
  router.delete("/byUser/:id", [authenticate], interest.deleteForUser)

  app.use("/resume-t2/interest", router);
};
