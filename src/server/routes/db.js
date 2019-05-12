const express = require("express"),
  router = express.Router(),
  { getProducts, userUpdate, userAuth, userGet } = require("../controllers/db"),
  erh = require("../services/erh");

router
  .get("/users", erh(userGet))
  .post("/users", erh(userAuth))
  .put("/users", erh(userUpdate))

  .get("/products", erh(getProducts));

module.exports = router;
