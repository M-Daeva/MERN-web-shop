const express = require("express"),
  router = express.Router(),
  userController = require("../controllers/user.controller");

router.post("/", userController.userAdd);
router.get("/:id", userController.userGet);
router.get("/", userController.userGetAll);
router.put("/:id", userController.userUpdate);
router.delete("/:id", userController.userDelete);
router.delete("/", userController.userDeleteAll);

module.exports = router;