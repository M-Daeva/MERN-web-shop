const express = require("express"),
  router = express.Router(),
  { getProducts, userUpdate, userAuth, userGet } = require("../controllers/db");

router
  .get("/users", userGet)
  .post("/users", userAuth)
  .put("/users", userUpdate)

  .get("/products", getProducts);

module.exports = router;
