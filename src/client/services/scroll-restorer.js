import ls from "./ls";

const url = PROD_MODE
		? "https://fewed.github.io/MERN-web-shop/#/products"
		: "http://localhost:8080/#/products",
	timeout = 200;

const scrollRestorer = () => {
	const data = ls.get();
	const { position = 0 } = data;
	scrollTo(0, position);

	const getPos = () => {
		if (location.href !== url) return;
		setTimeout(() => {
			data.position = pageYOffset;
			ls.set(data);
			getPos();
		}, timeout);
	};

	getPos();
};

export default scrollRestorer;
