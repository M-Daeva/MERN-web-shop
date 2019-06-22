const localDB = {
  products: [],
  users: []
};

const init = require("./init"),
  sendPreloadData = require("./send-preload-data")(localDB),
  userAuth = require("./user-auth")(localDB),
  sendUserData = require("./send-user-data")(localDB),
  synch = require("./synch-db"),
  updateUserInfo = require("./update-user-info")(localDB),
  _checkUsers = require("./check-users")(localDB);

init(localDB);

// synch(localDB);

module.exports = {
  sendPreloadData,
  updateUserInfo,
  userAuth,
  _checkUsers,
  sendUserData
};
