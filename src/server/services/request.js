const axios = require("axios"),
  { baseUrl } = require("../config");

const { baseURL, startPage } = require("../config").grabber;

const createRequest = config => {
  const ax = axios.create(config);

  class Request {
    get = async (url, params, config) =>
      (await ax.get(url, { params }, config)).data;
    post = async (url, params, config) =>
      (await ax.post(url, params, config)).data;
    put = async (url, params, config) =>
      (await ax.put(url, params, config)).data;
  }

  return new Request();
};

const req = createRequest({
  baseURL,
  headers: { "Content-Type": "application/json" }
});

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

module.exports = { add, get, put, del, all, delAll, req };

/*

import axios from "axios";
import { baseURL } from "../config";

const createRequest = (config) => {
	const ax = axios.create(config);

	class Request {
		get = async (url, params, config) => (await ax.get(url, { params }, config)).data;
		post = async (url, params, config) => (await ax.post(url, params, config)).data;
		put = async (url, params, config) => (await ax.put(url, params, config)).data;
	}

	return new Request();
};

const req = createRequest({
	baseURL,
	headers: { "Content-Type": "application/json" },
});

export { axios, req };


*/
