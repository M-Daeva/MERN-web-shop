const Product = require('../models/product.model');


const product_create = (req, res, next) => {
  const product = new Product({
    name: req.body.name,
    price: req.body.price
  });

  product.save((err) => {
    if (err) return next(err);
    res.send('Product Created successfully')
  })
};


const product_all = (req, res, next) => {
  Product.find((err, product) => {
    if (err) return next(err);
    res.send(product);
  })
};


const product_details = (req, res, next) => {
  Product.findOne({ _id: req.params.id }, (err, product) => {
    if (err) return next(err);
    res.send(product);
  })
};


const product_update = (req, res, next) => {
  Product.findOneAndUpdate(req.params.id, { $set: req.body }, (err, product) => {
    if (err) return next(err);
    res.send("updated");
  });
};


const product_delete = (req, res, next) => {
  Product.findOneAndDelete({ _id: req.params.id }, (err) => {
    if (err) return next(err);
    res.send('Deleted successfully!');
  })
};


module.exports = { product_create, product_details, product_update, product_delete, product_all };