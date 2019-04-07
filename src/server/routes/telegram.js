const express = require("express"),
  router = express.Router(),
  telegram = require("../controllers/telegram");

router.post("/", telegram);

module.exports = router;
