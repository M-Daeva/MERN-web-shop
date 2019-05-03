const User = require("../models/users");

const fpPost = (req, res, next) => {
  const { fingerprint } = req.body;

  if (!fingerprint) {
    const id = Date.now() + "" + Math.random();

    const empty = {
      login: "",
      password: "",
      cart: [],
      city: "",
      email: "",
      fingerprint: id
    };

    const user = new User(empty);

    user.save(err => {
      if (err) return next(err);
      const { cart, city, fingerprint } = empty;
      res.send({ cart, city, fingerprint });
    });
  } else {
    User.findOne({ fingerprint }, (err, user) => {
      //      console.log(user);
      if (err) return next(err);
      const { cart, city, fingerprint } = user || {};
      res.send({ cart, city, fingerprint });
    });
  }
};

module.exports = { fpPost };
