"use strict";

import "babel-polyfill";
import { log, sel } from "../common/lib";
import * as form from "./formAPI";
import * as req from "./requestAPI";
import "./QSPA";

form.set("Евгений", "+79287101926", "", "песок, щебень");

sel("button").addEventListener("click", async (e) => {
	e.preventDefault();
	try {
		const get = await req.get("/"),
			post = await req.add("/", form.get()),
			get2 = await req.all("/users"),
			get3 = await req.add("/telegram", form.get());

		log(get);
		log(get2);
		log(get3);
	} catch (e) {
		log(e);
	}
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

import ReactDOM from "react-dom";
import React, { Component } from "react";
import Button from "./components/button.jsx";
import Button2 from "./components/button.js";

//const button2 = new Button2().render();

//ReactDOM.render(<Button2 />, sel("form"));
