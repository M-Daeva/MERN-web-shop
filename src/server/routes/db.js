const express = require("express"),
  router = express.Router(),
  { getUsers, getProducts, userAdd, userUpdate } = require("../controllers/db");

router
  .get("/users", getUsers)
  .post("/users", userAdd)
  .get("/products", getProducts)

  .put("/users/:id", userUpdate);

module.exports = router;
