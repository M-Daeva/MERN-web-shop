const express = require("express"),
  router = express.Router(),
  userController = require("../controllers/user.controller");


router
  .get("/", userController.userGetAll)
  .post("/", userController.userAdd)
  .delete("/", userController.userDeleteAll)

  .get("/:id", userController.userGet)
  .put("/:id", userController.userUpdate)
  .delete("/:id", userController.userDelete);


module.exports = router;