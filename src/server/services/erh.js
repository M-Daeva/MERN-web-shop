const checkPermission = require("./check-permission");

const erh = fn => async (req, res, next) => {
  // checkPermission(req, res);
  try {
    await fn(req, res);
  } catch (error) {
    console.log(fn);
    next(error);
  }
};

module.exports = erh;
