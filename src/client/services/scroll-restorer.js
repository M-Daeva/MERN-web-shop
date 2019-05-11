import ls from "./ls";
import { restURL } from "./config";

const timeout = 200;

const scrollRestorer = () => {
	const { position = 0 } = ls.get();
	scrollTo(0, position);

	const getPos = () => {
		if (location.href !== restURL) return;
		setTimeout(() => {
			ls.set({ position: Math.round(pageYOffset) });
			getPos();
		}, timeout);
	};

	getPos();
};

export default scrollRestorer;
