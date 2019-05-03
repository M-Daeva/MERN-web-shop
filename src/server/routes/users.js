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
  .get("/", userGet)
  .post("/", userAdd)
  .delete("/", userDeleteAll)
  .put("/", userUpdate)

  //  .get("/:id", userGet)
  .delete("/:id", userDelete);

module.exports = router;
