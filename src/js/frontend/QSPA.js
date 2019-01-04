export default (() => {
	const pages = [...document.querySelectorAll("div[class^='popup']")],
		btns = [...document.querySelectorAll(".pages ul li")];

	pages.map((page) => {
		if (page.className.includes("order")) page.style.display = "block";
	});

	document.addEventListener("click", (e) => {
		const ind = btns.indexOf(e.target);
		if (ind !== -1) {
			pages.map((page, i) => (page.style.display = i === ind ? "block" : "none"));
		}
	});
})();
