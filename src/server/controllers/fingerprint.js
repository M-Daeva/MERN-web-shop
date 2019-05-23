const User = require("../models/users"),
  { getID } = require("../../utils");

const fpPost = async (req, res) => {
  const { fingerprint: fp } = req.body,
    empty = {
      login: "",
      password: "",
      cart: [],
      city: "",
      email: "",
      fingerprint: getID()
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
