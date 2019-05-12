const Product = require("../models/products");

const productGet = async (req, res) => {
  const product = await Product.findOne({ _id: req.params.id });
  res.send(product);
};

const productGetAll = async (req, res) => {
  const products = await Product.find();
  res.send(products);
};

module.exports = {
  productGet,
  productGetAll
};
