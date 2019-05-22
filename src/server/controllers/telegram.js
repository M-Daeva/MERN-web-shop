const request = require("../services/telegram");

const telegram = async (req, res) => {
  const obj = req.body;

  const text = Object.keys(obj).reduce((acc, cur) => {
    return acc + `${`${cur}`.bold()}: ${obj[cur]}\n`;
  }, ``);

  const info = await request.post("", { text });
  res.send(info);
};

module.exports = telegram;
