const express = require("express"),
  router = express.Router(),
  {
    sendPreloadData,
    updateUserInfo,
    userAuth,
    sendSecret,
    _checkUsers
  } = require("../controllers/local-db"),
  erh = require("../services/erh");

router
  .get("/preload-data", erh(sendPreloadData))
  .put("/update-user-info", erh(updateUserInfo))
  .post("/auth", erh(userAuth))
  .get("/secret", erh(sendSecret))
  .get("/check", erh(_checkUsers));

module.exports = router;
