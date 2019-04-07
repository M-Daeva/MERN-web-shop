const express = require("express"),
  router = express.Router(),
  {
    userGetAll,
    userAdd,
    userDeleteAll,
    userGet,
    userUpdate,
    userDelete
  } = require("../controllers/users");

router
  .get("/", userGetAll)
  .post("/", userAdd)
  .delete("/", userDeleteAll)

  .get("/:id", userGet)
  .put("/:id", userUpdate)
  .delete("/:id", userDelete);

module.exports = router;
