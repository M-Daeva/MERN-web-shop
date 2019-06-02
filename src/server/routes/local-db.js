const express = require("express"),
  router = express.Router(),
  {
    sendPreloadData,
    updateUserInfo,
    userAuth,
    _checkUsers,
    sendUserData
  } = require("../controllers/local-db"),
  erh = require("../services/erh");

router
  .get("/preload-data", erh(sendPreloadData))
  .put("/update-user-info", erh(updateUserInfo))
  .post("/auth", erh(userAuth))
  .get("/check", erh(_checkUsers))
  .get("/user-data", erh(sendUserData));

module.exports = router;
