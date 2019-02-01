const sendEmail = require("../mailerAPI");

const testGet = (req, res, next) => res.json({ a: 777 });

const testPost = (req, res, next) => {
  const data = req.body;
  const { email, name } = data;
  if (/\w+@\w+\.\w/.test(email)) sendEmail("John", email, `hi ${name}!`);
  data.id = 7;
  res.json(data);
};

module.exports = { testGet, testPost };
