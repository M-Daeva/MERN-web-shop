const express = require("express"),
  router = express.Router(),
  telegram = require("../controllers/telegram"),
  erh = require("../services/erh");

router.post("/", erh(telegram));

module.exports = router;
