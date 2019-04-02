const { create } = require("axios"),
  fs = require("fs"),
  { JSDOM } = require("jsdom"),
  baseURL = "https://www.chipdip.ru",
  startPage = "/catalog-show/arduino-controllers",
  ax = create({ baseURL });

const l = console.log.bind(console);

(async () => {
  const goods = [];

  try {
    const { data } = await ax.get(startPage);
    const dom = new JSDOM(data),
      $ = target => [...dom.window.document.querySelectorAll(target)];

    const startPageDeviceLinks = $(".item__content a").map(item => item.href);

    for (let deviceLink of startPageDeviceLinks) {
      const { data } = await ax.get(deviceLink);
      const dom = new JSDOM(data),
        $ = target => [...dom.window.document.querySelectorAll(target)];

      const name = $("h1")[0].textContent;
      const img = $(".product__image-preview")[0].src;
      let desc = $(".item_desc")[0].textContent;
      desc = desc
        .slice(
          0,
          desc.search(/Технические|Характеристики|Особенности|Спецификация/)
        )
        .trim();
      goods.push({ description: desc, name, img });
    }
  } catch (e) {
    l("request error");
  }

  fs.writeFile("dom.txt", JSON.stringify(goods), "utf8", () => l("done"));
})();

module.exports = {};
