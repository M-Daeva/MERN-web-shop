const express = require("express"),
  router = express.Router(),
  { fpPost } = require("../controllers/fingerprint"),
  erh = require("../services/erh");

router.post("/", erh(fpPost));

module.exports = router;
