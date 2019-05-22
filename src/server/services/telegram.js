const { createRequest } = require("./request"),
  { token, chatID } = require("../config").telegram;

const baseURL =
  `https://api.telegram.org/bot${token}` +
  `/sendMessage?chat_id=${chatID}` +
  `&parse_mode=html`;

const request = createRequest({
  baseURL,
  headers: { "Content-Type": "application/json" },
  timeout: 5000
});

module.exports = request;
