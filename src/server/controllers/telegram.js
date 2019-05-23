const ax = require("../services/telegram");

const telegram = async (req, res) => {
  const obj = req.body;

  const text = Object.keys(obj).reduce((acc, cur) => {
    return acc + `${`${cur}`.bold()}: ${obj[cur]}\n`;
  }, ``);

  await ax.post("", { text });
  res.send("telegram message delivered");
};

module.exports = telegram;
