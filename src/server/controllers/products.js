const Product = require("../models/products");

const productGetAll = async (req, res) => {
  const products = await Product.find();
  res.send(products);
};

module.exports = {
  productGetAll
};
