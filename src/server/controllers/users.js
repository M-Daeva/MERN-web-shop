const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("config");
const User = require("../models/users");
const l = console.log.bind(console);

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
  const { login, password, email, fingerprint } = req.body;
  User.findOne({ login }, async (err, user) => {
    if (err) return next(err);

    if (user) {
      const passMatch = await bcrypt.compare(password, user.password);

      if (passMatch) {
        jwt.sign({ login }, jwtSecret, { expiresIn: 60 }, (err, token) => {
          if (err) throw err;

          user.fingerprint = fingerprint;
          user.save(err => {
            if (err) throw err;

            const { cart, city } = user;
            res.send({ token, user: { cart, city } });
          });
        });
      } else {
        // wrong password
        res.send("wrong password");
      }
    } else {
      // write login and password
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) throw err;

          User.findOneAndUpdate(
            { fingerprint },
            { login, password: hash, email },
            err => {
              if (err) throw err;
              res.send("done");
            }
          );
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
