const axios = require("axios"),
  { baseUrl } = require("../config");

async function request(page, method, id = "", data) {
  if (id !== "") id = "/" + id;
  const url = baseUrl + page + id;
  const res = await axios(url, {
    method,
    headers: { "Content-Type": "application/json" },
    data: JSON.stringify(data)
  });
  const fb = res.data;

  return fb;
}

const add = async (page, data) => await request(page, "POST", undefined, data),
  all = async page => await request(page, "GET"),
  get = async (page, id) => await request(page, "GET", id),
  put = async (page, id, data) => await request(page, "PUT", id, data),
  del = async (page, id) => await request(page, "DELETE", id),
  delAll = async page => await request(page, "DELETE");

module.exports = { add, get, put, del, all, delAll };
