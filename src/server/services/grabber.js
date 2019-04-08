const { create } = require("axios"),
  fs = require("fs"),
  { JSDOM } = require("jsdom"),
  baseURL = "https://www.chipdip.ru",
  startPage = "/catalog-show/arduino-controllers",
  ax = create({ baseURL });

const l = console.log.bind(console);

const createQuerySelector = async link => {
  const { data } = await ax.get(link);
  const dom = new JSDOM(data);
  return target => [...dom.window.document.querySelectorAll(target)];
};

const getProducts = async () => {
  const goods = [];

  try {
    const $ = await createQuerySelector(startPage);
    const otherPages = $(".pager ul li a").map(item => item.href);
    const pages = [startPage, ...otherPages];

    for (let page of pages) {
      const $ = await createQuerySelector(page);
      const deviceLinks = $(".item__content a").map(item => item.href);

      for (let deviceLink of deviceLinks) {
        const $ = await createQuerySelector(deviceLink);
        const name = $("h1")[0].textContent,
          img = $(".product__image-preview")[0].src,
          desc = $(".item_desc")[0].textContent,
          price = +$(".ordering__value")[0].textContent.replace(/ /g, ""),
          info = desc
            .slice(
              0,
              desc.search(
                /Технические|Характеристики|Особенности|Спецификация|Описание|Отличительные/
              )
            )
            .trim(),
          params = desc
            .slice(
              desc.search(
                /Технические|Характеристики|Особенности|Спецификация|Описание|Отличительные/
              )
            )
            .trim();
        goods.push({ description: info, params, price, name, img });
      }
    }
  } catch (e) {
    l("request error");
  }

  //  fs.writeFile("dom.txt", JSON.stringify(goods), "utf8", () => l("done"));
  return goods;
};

module.exports = getProducts;
