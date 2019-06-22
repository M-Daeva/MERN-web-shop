const Product = require("../models/products"),
  User = require("../models/users"),
  { logTime, clearItem } = require("../../utils");

module.exports = localDB => {
  logTime("start");

  const _loadProducts = async () => {
    let products = await Product.find();
    products = products.map(product => {
      product = clearItem(product);
      product.id = product._id;
      delete product._id;
      delete product.__v;
      return product;
    });
    localDB.products = products;
  };

  const _loadUsers = async () => {
    localDB.users = await User.find();
    logTime("load users from db");
  };

  const _init = () => {
    _loadProducts();
    _loadUsers();
  };

  _init();
};
