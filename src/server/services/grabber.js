const { req } = require("../services/request"),
  { JSDOM } = require("jsdom"),
  { startPage } = require("../config").grabber,
  l = console.log.bind(console);

const createQuerySelector = async link => {
  const data = await req.get(link),
    dom = new JSDOM(data);
  return target => [...dom.window.document.querySelectorAll(target)];
};

const parsePage = $ => {
  const regex = /Технические|Характеристики|Особенности|Спецификация|Описание|Отличительные/,
    name = $("h1")[0].textContent,
    img = $(".product__image-preview")[0].src,
    desc = $(".item_desc")[0].textContent,
    price = +$(".ordering__value")[0].textContent.replace(/\s+/g, ""),
    info = desc.slice(0, desc.search(regex)).trim(),
    params = desc.slice(desc.search(regex)).trim();
  return { description: info, params, price, name, img };
};

const getProducts = async () => {
  const $ = await createQuerySelector(startPage),
    otherPages = $(".pager ul li a").map(item => item.href),
    pages = [startPage, ...otherPages],
    links = [],
    goods = [];

  for (let page of pages) {
    const $ = await createQuerySelector(page);
    $(".item__content a").map(item => links.push(item.href));
  }

  for (let link of links) {
    const $ = await createQuerySelector(link);
    goods.push(parsePage($));
  }

  return goods;
};

module.exports = getProducts;
