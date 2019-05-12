const User = require("../models/users");

const fpPost = async (req, res) => {
  const { fingerprint: fp } = req.body;
  const id = Date.now() + "" + Math.random();
  const empty = {
    login: "",
    password: "",
    cart: [],
    city: "",
    email: "",
    fingerprint: id
  };
  let { cart, city, fingerprint } = empty;

  if (!fp) {
    const user = new User(empty);
    await user.save();
  } else {
    ({ cart, city, fingerprint } =
      (await User.findOne({ fingerprint: fp })) || {});
  }
  res.send({ cart, city, fingerprint });
};

module.exports = { fpPost };
