const getProducts = require("../services/grabber");
const Products = require("../models/products");

const update = async (req, res) => {
  const data = await getProducts();

  for (let product of data) {
    await Products.findOneAndUpdate(
      { name: product.name },
      { $set: product },
      { upsert: true }
    );
  }

  res.send("db updated");
};

module.exports = { update };
