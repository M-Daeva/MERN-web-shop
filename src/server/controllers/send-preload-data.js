const { getID, l, logTime, getByEntry } = require("../../utils"),
  jwt = require("jsonwebtoken"),
  { jwtSecret } = require("../config");

module.exports = localDB => {
  const _checkToken = async req => {
    const token = req.header("x-auth-token");
    await jwt.verify(token, jwtSecret);
  };

  const sendPreloadData = async (req, res) => {
    let { fingerprint } = req.query,
      cart,
      city,
      orders,
      { users } = localDB,
      user = getByEntry(users, { fingerprint });

    if (!user) {
      user = {
        login: "",
        password: "",
        cart: [],
        orders: [],
        city: "",
        email: "",
        fingerprint: getID()
      };

      localDB.users.push(user);
    }
    ({ cart, city, fingerprint, orders } = user);

    let isAuthorized = false;
    try {
      await _checkToken(req);
      isAuthorized = true;
    } catch (e) {}

    const preloadData = {
      products: localDB.products,
      user: {
        cart,
        city,
        fingerprint
      },
      isAuthorized
    };

    if (isAuthorized) preloadData.user.orders = orders;

    logTime("send preload");
    res.send(preloadData);
  };

  return sendPreloadData;
};
