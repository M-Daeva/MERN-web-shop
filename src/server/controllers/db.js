const { productGetAll } = require("./products");
const { userGetAll, userAdd, userUpdate, userAuth } = require("./users");
const { all, get } = require("../services/request");

module.exports = {
  userAdd,
  userUpdate,
  getUsers: userGetAll,
  getProducts: productGetAll,
  userAuth
};
