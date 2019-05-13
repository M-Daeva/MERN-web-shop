const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config");
const l = console.log.bind(console);

const checkToken = async req => {
  const token = req.header("x-auth-token");
  await jwt.verify(token, jwtSecret);
};

const payment = async (req, res) => {
  await checkToken(req);
  res.send({ info: "secret" });
};

module.exports = { payment };
