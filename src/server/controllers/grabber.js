const getProducts = require("../services/grabber");
const Products = require("../models/products");

const update = async (req, res, next) => {
  const data = await getProducts();

  data.map(product =>
    Products.findOneAndUpdate(
      { name: product.name },
      { $set: product },
      { upsert: true }
    )
  );

  res.send("db updated");
};

module.exports = { update };
