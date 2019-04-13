const url = "http://localhost:8080/#/products",
	timeout = 1000;

const scrollRestorer = () => {
	const { MERNwebShop = JSON.stringify({ position: 0 }) } = localStorage;
	const { position } = JSON.parse(MERNwebShop);
	scrollTo(0, position);

	const getPos = () => {
		if (location.href !== url) return;
		setTimeout(() => {
			localStorage.MERNwebShop = JSON.stringify({ position: pageYOffset });
			getPos();
		}, timeout);
	};

	getPos();
};

export default scrollRestorer;
