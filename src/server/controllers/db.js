const { productGetAll } = require("./products");
const { userGetAll } = require("./users");
const { all, get } = require("../services/request");

module.exports = {
  getUsers: userGetAll,
  getProducts: productGetAll
};
