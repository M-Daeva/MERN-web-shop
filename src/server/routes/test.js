const express = require("express"),
  router = express.Router(),
  { testGet, testPost } = require("../controllers/test");

router.get("/", testGet).post("/", testPost);

module.exports = router;
