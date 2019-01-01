export { request, add, get, put, del, all };

const baseUrl = "http://localhost:3000/products";

async function request(method, id = "", data) {
	const url = `${baseUrl}/${id}`;
	const res = await fetch(url, {
		method,
		//	headers: { "Content-Type": "application/x-www-form-urlencoded" },
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	});
	const fb = await res.text();

	return fb;
}

const add = async (data) => await request("POST", undefined, data),
	all = async () => await request("GET"),
	get = async (id) => await request("GET", id),
	put = async (id, data) => await request("PUT", id, data),
	del = async (id) => await request("DELETE", id);
