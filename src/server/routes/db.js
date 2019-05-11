const express = require("express"),
  router = express.Router(),
  {
    getUsers,
    getProducts,
    userAdd,
    userUpdate,
    userAuth
  } = require("../controllers/db");

router
  .get("/users", getUsers)
  .post("/users", userAuth)
  .get("/products", getProducts)

  .put("/users/:id", userUpdate);

module.exports = router;
