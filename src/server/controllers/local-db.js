const Product = require("../models/products"),
  User = require("../models/users"),
  { getID, l, logTime, getByEntry } = require("../../utils"),
  bcrypt = require("bcryptjs"),
  jwt = require("jsonwebtoken"),
  { jwtSecret } = require("../config");

let localDB = {
  products: [],
  users: []
};

logTime("start");

const _loadProducts = async () => {
  let products = await Product.find();
  products = products.map(({ _id, name, description, img, params, price }) => {
    return {
      id: _id,
      name,
      description,
      img,
      params,
      price
    };
  });
  localDB.products = products;
};

const _loadUsers = async () => {
  localDB.users = await User.find();
  logTime("load users from db");
};

const _init = () => {
  _loadProducts();
  _loadUsers();
};

_init();

const _updateUsers = async () => {
  for (let user of localDB.users) {
    await User.findOneAndUpdate(
      { fingerprint: user.fingerprint },
      { $set: user },
      { upsert: true }
    );
  }
};

const _syncDB = async (period = 10) => {
  await _updateUsers();
  setTimeout(_syncDB, 1e3 * period);
};

//_syncDB();

const sendPreloadData = (req, res) => {
  const { fingerprint: fp } = req.query;

  const user = localDB.users.find(({ fingerprint }) => fingerprint === fp);
  let cart, city, fingerprint;

  if (!user) {
    const newUser = {
      login: "",
      password: "",
      cart: [],
      city: "",
      email: "",
      fingerprint: getID()
    };

    localDB.users.push(newUser);

    ({ cart, city, fingerprint } = newUser);
  } else ({ cart, city, fingerprint } = user);

  const preloadData = {
    products: localDB.products,
    user: {
      cart,
      city,
      fingerprint
    }
  };
  logTime("send preload");
  res.send(preloadData);
};

const updateUserInfo = (req, res) => {
  const newUser = req.body;

  localDB.users = localDB.users.map(user => {
    if (user.fingerprint === newUser.fingerprint) {
      const temp = JSON.parse(JSON.stringify(user));
      return { ...temp, ...newUser };
    }
    return user;
  });
  res.send(localDB.users);
};

const userAuth = async (req, res) => {
  const expiresIn = 10;

  const { login, password, email, fingerprint } = req.body;

  const user = getByEntry(localDB.users, { login });

  if (user) {
    const passMatch = await bcrypt.compare(password, user.password);

    if (passMatch) {
      const token = await jwt.sign({ fingerprint }, jwtSecret, { expiresIn });

      localDB.users = localDB.users.map(user => {
        if (user.login !== login) return user;
        user.fingerprint = fingerprint;
        return user;
      });
      const { cart, city } = user;

      res.send({ token, user: { cart, city, fingerprint } });
    } else {
      // wrong password
      res.send("wrong password");
    }
  } else {
    // write login and password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    localDB.users = localDB.users.map(user => {
      if (user.fingerprint !== fingerprint) return user;
      return { login, password: hash, email };
    });

    res.send("rigistered");
  }
};

const _checkToken = async req => {
  const token = req.header("x-auth-token");
  await jwt.verify(token, jwtSecret);
};

const sendSecret = async (req, res) => {
  let isAuthorized = false;
  try {
    await _checkToken(req);
    isAuthorized = true;
  } catch (e) {}
  res.send({ isAuthorized });
};

const _checkUsers = async (req, res) => {
  res.send(localDB.users);
};

module.exports = {
  sendPreloadData,
  updateUserInfo,
  userAuth,
  sendSecret,
  _checkUsers
};
