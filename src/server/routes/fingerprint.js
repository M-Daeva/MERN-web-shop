const express = require("express"),
  router = express.Router(),
  { fpPost, fpGet } = require("../controllers/fingerprint");

router.post("/", fpPost).get("/", fpGet);

module.exports = router;
