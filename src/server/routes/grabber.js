const express = require("express"),
  router = express.Router(),
  { update } = require("../controllers/grabber");

router.get("/", update);

module.exports = router;
