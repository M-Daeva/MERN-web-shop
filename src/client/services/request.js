import axios from "axios";
import { baseURL } from "./config";
import l from "./log";

const ax = axios.create({
	baseURL,
	headers: { "Content-Type": "application/json" },
});

class Ax2 {
	get = async (url, params, config) => (await ax.get(url, { params }, config)).data;

	post = async (url, params, config) => (await ax.post(url, params, config)).data;

	put = async (url, params, config) => (await ax.put(url, params, config)).data;
}

const ax2 = new Ax2();

async function request(page, method, id = "", info) {
	if (id !== "") id = "/" + id;
	const url = baseURL + page + id;

	const { data } = await axios(url, {
		method,
		headers: { "Content-Type": "application/json" },
		data: JSON.stringify(info),
	});

	return data;
}

const add = async (page, data) => await request(page, "POST", undefined, data),
	all = async (page) => await request(page, "GET"),
	get = async (page, id, data) => await request(page, "GET", id, data),
	put = async (page, id, data) => await request(page, "PUT", id, data),
	del = async (page, id) => await request(page, "DELETE", id),
	delAll = async (page) => await request(page, "DELETE");

export { add, get, put, del, all, delAll, axios, ax, ax2 };
