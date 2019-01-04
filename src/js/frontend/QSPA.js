export default (() => {
	let startInd = 3;
	const pages = [...document.querySelectorAll("div[class^='popup']")],
		btns = [...document.querySelectorAll(".pages ul li")];

	if (localStorage.QSPA !== undefined) startInd = +localStorage.QSPA;

	pages.map((page, i) => {
		if (i === startInd) page.style.display = "block";
	});

	document.addEventListener("click", (e) => {
		const ind = btns.indexOf(e.target);
		if (ind === -1) return;
		pages.map((page, i) => {
			if (i === ind) {
				page.style.display = "block";
				localStorage.QSPA = ind;
			} else page.style.display = "none";
		});
	});
})();
