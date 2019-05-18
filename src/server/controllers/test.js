const test = (req, res) => {
  res.send(req.headers);
};

module.exports = { test };
