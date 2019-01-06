const axios = require("axios");

const token = "741106985:AAFV0rcEhYWqcyJ1UU8EuvM2WgEM8yg05jg";
const chatID = "-327421362";
const baseURL =
  `https://api.telegram.org/bot${token}` +
  `/sendMessage?chat_id=${chatID}` +
  `&parse_mode=html`;

const ax = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" }
});

const telegram = (req, res, next) => {
  const obj = req.body;

  const text = Object.keys(obj).reduce((acc, cur) => {
    return acc + `${`${cur}`.bold()}: ${obj[cur]}\n`
  }, ``);

  try { ax.post("", { text }) }
  catch (e) { console.log(e) }

  res.send("done");
};

module.exports = telegram;