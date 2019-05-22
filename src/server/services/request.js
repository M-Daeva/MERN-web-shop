const { l, createRequest } = require("../../utils"),
  { baseURL } = require("../config").grabber;

const request = createRequest({
  baseURL,
  headers: { "Content-Type": "application/json" }
});

module.exports = { request, createRequest };
