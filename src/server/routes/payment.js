const express = require("express"),
  router = express.Router(),
  { payment } = require("../controllers/payment"),
  erh = require("../services/erh");

router.get("/", erh(payment));

module.exports = router;
