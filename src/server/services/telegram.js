const { create } = require("axios"),
  { token, chatID } = require("config").telegram;

const baseURL =
  `https://api.telegram.org/bot${token}` +
  `/sendMessage?chat_id=${chatID}` +
  `&parse_mode=html`;

const ax = create({
  baseURL,
  headers: { "Content-Type": "application/json" }
});

module.exports = ax;
