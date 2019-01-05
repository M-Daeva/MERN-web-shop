export { add, get, put, del, all, delAll };

//const baseUrl = "http://localhost:3000";
const baseUrl = "https://mern-web-shop.herokuapp.com";

async function request(page, method, id = "", data) {
	if (id !== "") id = "/" + id;
	const url = baseUrl + page + id;
	const res = await fetch(url, {
		method,
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	});
	const fb = await res.text();

	return fb;
}

const add = async (page, data) => await request(page, "POST", undefined, data),
	all = async (page) => await request(page, "GET"),
	get = async (page, id) => await request(page, "GET", id),
	put = async (page, id, data) => await request(page, "PUT", id, data),
	del = async (page, id) => await request(page, "DELETE", id),
	delAll = async (page) => await request(page, "DELETE");
