const fpGet = (req, res, next) => {
  // const data = req.body;
  // const id = Date.now() + "" + Math.random();
  res.json("get");
};

const fpPost = (req, res, next) => {
  const { fingerprint } = req.body;
  const id = Date.now() + "" + Math.random();
  res.json(fingerprint || id);
};

module.exports = { fpPost, fpGet };
