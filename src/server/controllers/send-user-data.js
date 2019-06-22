const { getByEntry } = require("../../utils");

module.exports = localDB => {
  const sendUserData = (req, res) => {
    let { fingerprint } = req.query,
      city,
      cart,
      { users } = localDB;

    const user = getByEntry(users, { fingerprint });
    ({ cart, city, fingerprint } = user);
    res.send({ cart, city, fingerprint });
  };

  return sendUserData;
};
