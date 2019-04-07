const express = require("express"),
  router = express.Router(),
  { getUsers, getProducts } = require("../controllers/db");

router.get("/users", getUsers).get("/products", getProducts);

module.exports = router;
