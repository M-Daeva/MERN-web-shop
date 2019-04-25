const { create } = require("axios"),
  { JSDOM } = require("jsdom"),
  baseURL = "https://www.chipdip.ru",
  startPage = "/catalog-show/arduino-controllers",
  ax = create({ baseURL }),
  l = console.log.bind(console);

const createQuerySelector = async link => {
  const { data } = await ax.get(link);
  const dom = new JSDOM(data);
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
  const goods = [];

  try {
    const $ = await createQuerySelector(startPage);
    const otherPages = $(".pager ul li a").map(item => item.href);
    const pages = [startPage, ...otherPages];

    const pagesArr = await Promise.all(pages.map(createQuerySelector));
    const links = [];
    pagesArr.map($ => $(".item__content a").map(item => links.push(item.href)));

    for (let link of links) {
      const $ = await createQuerySelector(link);
      goods.push(parsePage($));
    }
  } catch (e) {
    l("request error", e);
  }

  return goods;
};

module.exports = getProducts;
