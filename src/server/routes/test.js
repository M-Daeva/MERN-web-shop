const express = require("express"),
  router = express.Router(),
  { test } = require("../controllers/test"),
  erh = require("../services/erh");

router.get("/", erh(test));

module.exports = router;
