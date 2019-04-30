import ls from "./ls";

const url = PROD_MODE
		? "https://fewed.github.io/MERN-web-shop/#/products"
		: "http://localhost:8080/#/products",
	timeout = 200;

const scrollRestorer = () => {
	const { position = 0 } = ls.get();
	scrollTo(0, position);

	const getPos = () => {
		if (location.href !== url) return;
		setTimeout(() => {
			ls.set({ position: Math.round(pageYOffset) });
			getPos();
		}, timeout);
	};

	getPos();
};

export default scrollRestorer;
