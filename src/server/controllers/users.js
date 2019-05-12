const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("config");
const User = require("../models/users");
const l = console.log.bind(console);

const userAdd = async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.send("added");
};

const userGet = async (req, res) => {
  const { fingerprint } = req.query;
  const user = await User.findOne({ fingerprint });
  res.send(user);
};

const userGetAll = async (req, res) => {
  const users = await User.find();
  res.send(users);
};

const checkToken = (req, res) => {
  const token = req.header("x-auth-token");

  const decoded = jwt.verify(token, jwtSecret);
  return decoded;
};

const userAuth = async (req, res) => {
  const expiresIn = 300;

  try {
    await checkToken(req);
    l("authorized");
  } catch (e) {
    l("non authorized");
  }

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

const userDelete = async (req, res) => {
  await User.findOneAndDelete({ _id: req.params.id });
  res.send("deleted");
};

const userDeleteAll = async (req, res) => {
  await User.deleteMany();
  res.send("deleted all");
};

module.exports = {
  userAdd,
  userGet,
  userGetAll,
  userUpdate,
  userDelete,
  userDeleteAll,
  userAuth
};
