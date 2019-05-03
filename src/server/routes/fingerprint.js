const express = require("express"),
  router = express.Router(),
  { fpPost } = require("../controllers/fingerprint");

router.post("/", fpPost);

module.exports = router;
