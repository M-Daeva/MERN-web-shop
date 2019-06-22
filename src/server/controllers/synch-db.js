const { clearItem, l } = require("../../utils"),
  User = require("../models/users");

module.exports = localDB => {
  const _updateUsers = async () => {
    for (let user of localDB.users) {
      user = clearItem(user);
      const { fingerprint } = user,
        newUser = Object.keys(user).reduce((acc, cur) => {
          if (cur !== "_id" && cur !== "__v") acc[cur] = user[cur];
          return acc;
        }, {});

      l(76);
      l(newUser);
      await User.findOneAndUpdate(
        { fingerprint },
        { $set: newUser },
        { upsert: true }
      );
    }
  };

  const _syncDB = async (period = 10) => {
    await _updateUsers();
    setTimeout(_syncDB, 1e3 * period);
  };

  _syncDB();
};
