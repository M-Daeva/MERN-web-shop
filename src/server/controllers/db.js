const { productGetAll } = require("./products");
const { userGet, userUpdate, userAuth } = require("./users");

module.exports = {
  getProducts: productGetAll,
  userUpdate,
  userAuth,
  userGet
};
