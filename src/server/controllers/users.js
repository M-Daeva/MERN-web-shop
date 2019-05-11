const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//const jS = require("config").get("jwtSecret");
const User = require("../models/users");

const userAdd = (req, res, next) => {
  const user = new User(req.body);

  user.save(err => {
    if (err) return next(err);
    res.send("added");
  });
};

const userGet = (req, res, next) => {
  const { fingerprint } = req.query;

  User.findOne({ fingerprint }, (err, user) => {
    if (err) return next(err);
    res.send(user);
  });
};

const userGetAll = (req, res, next) => {
  User.find((err, users) => {
    if (err) return next(err);
    res.send(users);
  });
};

const userAuth = (req, res, next) => {
  const { login, password, email, cart, city, fingerprint } = req.body;

  User.findOne({ login }, (err, user) => {
    if (err) return next(err);
    if (user) res.send(user);
    else {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) throw err;
          const newUser = new User({ ...req.body, ...{ password: hash } });

          newUser.save(err => {
            if (err) return next(err);
            res.send("added");
          });
        });
      });
    }
  });
};

const userUpdate = (req, res, next) => {
  const { fingerprint, city, cart } = req.body;

  User.findOneAndUpdate(
    { fingerprint },
    {
      $set: { cart }
    },
    () => {
      User.findOneAndUpdate(
        { fingerprint },
        {
          $pull: { cart: { quantity: "0" } }
        },
        (err, user) => {
          if (err) return next(err);
          res.send(user.cart);
        }
      );
    }
  );
};

const userDelete = (req, res, next) => {
  User.findOneAndDelete({ _id: req.params.id }, err => {
    if (err) return next(err);
    res.send("deleted");
  });
};

const userDeleteAll = (req, res, next) => {
  User.deleteMany(err => {
    if (err) return next(err);
    res.send("deleted all");
  });
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
