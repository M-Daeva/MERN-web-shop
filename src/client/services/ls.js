const set = (key, value) => {
	const data = JSON.stringify(value);
	localStorage.setItem(key, data);
};

const get = (key) => JSON.parse(localStorage.getItem(key));

const ls = { get, set };

export default ls;
