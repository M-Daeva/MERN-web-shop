export { get, init };

function get() {
	const inputs = [...document.querySelectorAll("input[name]")];
	return inputs.reduce((acc, cur) => {
		acc[cur.getAttribute("name")] = cur.value;
		return acc;
	}, {});
}

function init(...vals) {
	const inputs = [...document.querySelectorAll("input[name]")];
	inputs.map((item, i) => (item.value = vals[i]));
}
