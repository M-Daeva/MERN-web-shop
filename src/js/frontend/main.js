"use strict";

import "babel-polyfill";
import { log, sel } from "./lib";
import * as form from "./formAPI";
import * as req from "./requestAPI";
import "./QSPA";

//router();
//router();

form.set("Евгений", "+79287101926", "", "песок, щебень");

sel("button").addEventListener("click", async (e) => {
	e.preventDefault();
	const get = await req.get("/"),
		get2 = await req.all("/users");
	log(get);
	log(get2);
});

/*
req.all("/").then((d) => log("/", d));
req.all("/users").then((d) => log("/users", d));
*/

/*
const id = "5c2d13d79fddaf2e24d6a883";

(async () => {
	await req.add("/users", form.get()).then(log);
	await req.all("/users").then(log);
	await req.get("/users", id).then(log);
	form.set("Евгений", "+79287101926", "", "керамзит");
	await req.put("/users", id, form.get()).then(log);
	await req.delAll("/users").then(log);
})();
*/
