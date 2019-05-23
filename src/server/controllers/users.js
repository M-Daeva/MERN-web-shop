const User = require("../models/users"),
  bcrypt = require("bcryptjs"),
  jwt = require("jsonwebtoken"),
  { jwtSecret } = require("../config"),
  { l } = require("../../utils");

const userGet = async (req, res) => {
  const { fingerprint } = req.query;
  const user = await User.findOne({ fingerprint });
  res.send(user);
};

const userAuth = async (req, res) => {
  const expiresIn = 10;

  const { login, password, email, fingerprint } = req.body;
  const user = await User.findOne({ login });

  if (user) {
    const passMatch = await bcrypt.compare(password, user.password);

    if (passMatch) {
      const token = await jwt.sign({ fingerprint }, jwtSecret, { expiresIn });

      user.fingerprint = fingerprint;
      const { cart, city } = await user.save();

      res.send({ token, user: { cart, city } });
    } else {
      // wrong password
      res.send("wrong password");
    }
  } else {
    // write login and password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    await User.findOneAndUpdate(
      { fingerprint },
      { login, password: hash, email }
    );
    res.send("rigistered");
  }
};

const userUpdate = async (req, res) => {
  const { fingerprint, cart } = req.body;

  await User.findOneAndUpdate(
    { fingerprint },
    {
      $set: { cart }
    }
  );

  const user = await User.findOneAndUpdate(
    { fingerprint },
    {
      $pull: { cart: { quantity: "0" } }
    }
  );
  res.send(user.cart);
};

module.exports = {
  userGet,
  userUpdate,
  userAuth
};
