const { createRequest } = require("../../utils"),
  { token, chatID } = require("../config").telegram;

const baseURL =
  `https://api.telegram.org/bot${token}` +
  `/sendMessage?chat_id=${chatID}` +
  `&parse_mode=html`;

const request = createRequest({
  baseURL,
  headers: { "Content-Type": "application/json" },
  timeout: 1000
});

module.exports = request;
