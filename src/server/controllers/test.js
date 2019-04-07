const testGet = (req, res, next) => res.json({ a: 777 });

const testPost = (req, res, next) => {
  const data = req.body;
  data.id = 7;
  res.json(data);
};

module.exports = { testGet, testPost };
