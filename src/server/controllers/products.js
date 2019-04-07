const Product = require("../models/products");

const productGet = (req, res, next) => {
  Product.findOne({ _id: req.params.id }, (err, product) => {
    if (err) return next(err);
    res.send(product);
  });
};

const productGetAll = (req, res, next) => {
  Product.find((err, products) => {
    if (err) return next(err);
    res.send(products);
  });
};

module.exports = {
  productGet,
  productGetAll
};
