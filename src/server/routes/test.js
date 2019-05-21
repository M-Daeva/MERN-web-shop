const express = require("express"),
  router = express.Router(),
  { getHandler, postHandler } = require("../controllers/test"),
  erh = require("../services/erh");

router.get("/", erh(getHandler)).post("/", erh(postHandler));

module.exports = router;
