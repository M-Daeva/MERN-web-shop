const { imupar } = require("../../utils");

module.exports = localDB => {
  const updateUserInfo = (req, res) => {
    const newUser = req.body,
      { fingerprint } = newUser,
      { users } = localDB;

    localDB.users = imupar(users, newUser, { fingerprint }, false);
    res.send(localDB.users);
  };

  return updateUserInfo;
};
