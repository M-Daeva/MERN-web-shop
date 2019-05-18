const { referer, host, referer2, host2 } = require("../config");

const checkPermission = (req, res) => {
  const { referer: r, host: h } = req.headers,
    c = r === referer && h === host,
    c2 = r === referer2 && h === host2;
  if (!(c || c2))
    res
      .status(403)
      .send(
        "Access Denied. You don't have permission to access on this server"
      );
};

module.exports = checkPermission;
