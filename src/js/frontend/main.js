"use strict";

import "babel-polyfill";
import { log, sel } from "./lib";
import * as form from "./formAPI";
import * as req from "./requestAPI";
import "./QSPA";

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

/*
const token = "741106985:AAFV0rcEhYWqcyJ1UU8EuvM2WgEM8yg05jg";
const chatID = "-327421362";
const msg = "Hi, my friend!";

const p =
	`https://api.telegram.org/bot${token}` +
	`/sendMessage?chat_id=${chatID}` +
	`&parse_mode=html&text=${msg}`;

fetch(p, { method: "POST" })
	.then((d) => d.json())
	.then(log);
*/

/*
import sum from "../common/lib";
log(sum(5, 7));
*/

/*
import axios from "axios";

const token = "741106985:AAFV0rcEhYWqcyJ1UU8EuvM2WgEM8yg05jg";
const chatID = "-327421362";
const msg = { text: "синий друг тоже работает с axios" };

const p =
	`https://api.telegram.org/bot${token}` +
	`/sendMessage?chat_id=${chatID}` +
	`&parse_mode=html`;



axios.post(p, JSON.stringify(msg), {
	headers: { "Content-Type": "application/json" },
});
*/
