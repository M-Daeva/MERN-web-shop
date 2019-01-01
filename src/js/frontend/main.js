"use strict";

import "babel-polyfill";
import { log, sel, sum } from "./lib";
import { sendData, getData, getForm, initForm } from "./frontAPI";

/*
log(sum(5, 7));

fetch("http://msementsov.ru/xhr/test.json")
	.then((res) => res.json())
	.then(log);

const url = "http://faceprog.ru/js-hw-api/articles.php",
	url2 = "js-hw-api/articles.php",
	conf = {
		headers: { Autorization: "cb1d4f58587a8cb47633a69261507a8e" },
	};

fetch(url2, conf)
	.then((d) => d.json())
	.then((d) => log(d[0]));
*/

//initForm("Eugene", "+79841232809", "msementsov@mail.ru", "wood, cobalt");
initForm("Eugene", "+79611236308", "", "wood, cobalt");

sel("button").addEventListener("click", async (e) => {
	e.preventDefault();
	const fb = await sendData(getForm());
	const fb2 = await getData();
	log(fb.log, fb2);
});

// убрать перезагрузку nodemon при изменении фронтовых скриптов +
// сделать норм фронт апи
// сделать модуль либ универсальным для фронт и бэк -
// прикрутить отправку темплейта в письме -

import { request, add, get, put, del, all } from "./frontAPIforCRUD";

const id = "5c2bc62df9c4aa0ed064044c";

//add({ name: "apple", price: 50 });
all().then(log);
//get(id).then(log);
//put(id, { name: "banana", price: 50 });
//del(id);
