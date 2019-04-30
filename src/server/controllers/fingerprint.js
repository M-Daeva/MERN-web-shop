const fpGet = (req, res, next) => {
  // const data = req.body;
  // const id = Date.now() + "" + Math.random();
  res.json("post");
};

const fpPost = (req, res, next) => {
  console.log(req.body);
  const { fingerprint } = req.body;
  const id = Date.now() + "" + Math.random();
  const data = fingerprint === "empty" ? id : fingerprint;
  res.json(data);
};

module.exports = { fpPost, fpGet };
