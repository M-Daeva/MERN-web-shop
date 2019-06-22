const { getByEntry, imupar, imfi, mergeCarts } = require("../../utils"),
  bcrypt = require("bcryptjs"),
  jwt = require("jsonwebtoken"),
  { jwtSecret } = require("../config");

module.exports = localDB => {
  const userAuth = async (req, res) => {
    let expiresIn = 10,
      { login, password, email, fingerprint } = req.body,
      { users } = localDB,
      user = getByEntry(users, { login });

    if (user) {
      const passMatch = await bcrypt.compare(password, user.password);

      if (passMatch) {
        const token = await jwt.sign({ fingerprint }, jwtSecret, { expiresIn });

        // if fingerprint changed
        // get cart by current fingerprint
        // and merge it with cart by previous fingerprint
        if (user.fingerprint !== fingerprint) {
          let { cart: curCart } = getByEntry(users, { fingerprint }),
            { cart: preCart } = getByEntry(users, { login }),
            mergedCart = mergeCarts(preCart, curCart);

          users = imfi(users, { fingerprint });
          localDB.users = imupar(
            users,
            { fingerprint, cart: mergedCart },
            { login }
          );
        }
        const { cart, city } = user;

        res.send({ token, user: { cart, city, fingerprint } });
      } else {
        // wrong password
        res.send("wrong password");
      }
    } else {
      // write login and password
      const salt = await bcrypt.genSalt(10),
        hash = await bcrypt.hash(password, salt);

      localDB.users = imupar(
        users,
        { login, password: hash, email },
        { fingerprint }
      );

      res.send("rigistered");
    }
  };

  return userAuth;
};
