const sendEmail = require("../mailerAPI");

const testGet = (req, res, next) => res.json({ a: 7 });

const testPost = (req, res, next) => {
  const data = req.body;
  //  if (/\w+@\w+\.\w/.test(data.email)) sendEmail("John", data.email, `hi ${data.name}!`);
  data.id = 7;
  res.json(data);
};

module.exports = { testGet, testPost };