module.exports = {
  port: process.env.PORT || 3000,
  baseUrl: "http://localhost:3000",
  dbURL: "mongodb://fewed:26853141q@ds117158.mlab.com:17158/mern-web-shop",
  jwtSecret: "MERN webshop",
  grabber: {
    baseURL: "https://www.chipdip.ru",
    startPage: "/catalog-show/arduino-controllers"
  },
  telegram: {
    token: "741106985:AAFV0rcEhYWqcyJ1UU8EuvM2WgEM8yg05jg",
    chatID: "-327421362"
  }
};
