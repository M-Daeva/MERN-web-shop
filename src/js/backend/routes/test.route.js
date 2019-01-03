const express = require("express"),
  router = express.Router(),
  testController = require("../controllers/test.controller");

router
  .get("/", testController.testGet)
  .post("/", testController.testPost)

module.exports = router;