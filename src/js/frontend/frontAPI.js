export { sendData, getData, getForm, initForm };

const baseUrl = "http://localhost:3000";

async function sendData(obj, extraUrl = "", url = baseUrl) {
	url += extraUrl;
	const res = await fetch(url, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify(obj),
	});
	const fb = await res.json();

	return fb;
}

async function getData(extraUrl = "", url = baseUrl) {
	url += extraUrl;
	const res = await fetch(url, {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
	});
	const fb = await res.json();

	return fb;
}

function getForm() {
	const inputs = [...document.querySelectorAll("input[name]")];
	return inputs.reduce((acc, cur) => {
		acc[cur.getAttribute("name")] = cur.value;
		return acc;
	}, {});
}

function initForm(...vals) {
	const inputs = [...document.querySelectorAll("input[name]")];
	inputs.map((item, i) => (item.value = vals[i]));
}
