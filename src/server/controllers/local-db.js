const Product = require("../models/products"),
  User = require("../models/users"),
  {
    getID,
    l,
    logTime,
    getByEntry,
    imup,
    imupar,
    clearItem,
    imfi,
    mergeCarts
  } = require("../../utils"),
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
  products = products.map(product => {
    product = clearItem(product);
    product.id = product._id;
    delete product._id;
    delete product.__v;
    return product;
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
    const { fingerprint } = user;

    await User.findOneAndUpdate(
      { fingerprint },
      { $set: user },
      { upsert: true }
    );
  }
};

const _syncDB = async (period = 10) => {
  await _updateUsers();
  setTimeout(_syncDB, 1e3 * period);
};

_syncDB();

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

const updateUserInfo = (req, res) => {
  const newUser = req.body,
    { fingerprint } = newUser,
    { users } = localDB;

  localDB.users = imupar(users, newUser, { fingerprint }, false);
  res.send(localDB.users);
};

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

const _checkToken = async req => {
  const token = req.header("x-auth-token");
  await jwt.verify(token, jwtSecret);
};

const _checkUsers = async (req, res) => {
  res.send(localDB.users);
};

const sendUserData = (req, res) => {
  let { fingerprint } = req.query,
    city,
    cart,
    { users } = localDB;

  const user = getByEntry(users, { fingerprint });
  ({ cart, city, fingerprint } = user);
  res.send({ cart, city, fingerprint });
};

module.exports = {
  sendPreloadData,
  updateUserInfo,
  userAuth,
  _checkUsers,
  sendUserData
};
