const ax = require("../services/telegram");

const telegram = async (req, res) => {
  const obj = req.body;

  const text = Object.keys(obj).reduce((acc, cur) => {
    return acc + `${`${cur}`.bold()}: ${obj[cur]}\n`;
  }, ``);

  try {
    ax.post("", { text });
  } catch (e) {
    console.log(e);
  }

  res.send("done");
};

module.exports = telegram;
