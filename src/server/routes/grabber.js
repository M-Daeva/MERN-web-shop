const express = require("express"),
  router = express.Router(),
  { update } = require("../controllers/grabber"),
  erh = require("../services/erh");

router.get("/", erh(update));

module.exports = router;
