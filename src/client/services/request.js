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
