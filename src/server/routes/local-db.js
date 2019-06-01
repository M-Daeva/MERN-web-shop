const express = require("express"),
  router = express.Router(),
  {
    sendPreloadData,
    updateUserInfo,
    userAuth,
    sendSecret
  } = require("../controllers/local-db"),
  erh = require("../services/erh");

router
  .get("/preload-data", erh(sendPreloadData))
  .put("/update-user-info", erh(updateUserInfo))
  .post("/auth", erh(userAuth))
  .get("/secret", erh(sendSecret));

module.exports = router;
