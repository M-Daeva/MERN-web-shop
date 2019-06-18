require("dotenv").config({ path: "../.env" });

const p = process.env;

module.exports = {
  port: p.PORT || p.PORT2,
  baseUrl: p.BASE_URL,
  dbURL: p.DB_URL,
  jwtSecret: p.JWT_SECRET,
  grabber: {
    baseURL: p.GRB_BASE_URL,
    startPage: p.GRB_START_PAGE
  },
  telegram: {
    token: p.TLG_TOKEN,
    chatID: p.TLG_CHAT_ID
  },
  dogecoin: {
    TEST_API_KEY: p.DOGE_TEST_API_KEY,
    API_KEY: p.DOGE_API_KEY,
    SECRET_PIN: p.DOGE_SECRET_PIN,
    label: p.DOGE_LABEL,
    label2: p.DOGE_LABEL2,
    address: p.DOGE_ADDRESS,
    address2: p.DOGE_ADDRESS2,
    dogeURL: p.NODE_ENV === "development" ? p.DOGE_DEV_URL : p.DOGE_PROD_URL
  },
  referer: p.REFERER,
  host: p.HOST,
  referer2: p.REFERER2,
  host2: p.HOST2,
  ngrok: p.NGROK_URL,
  geo: {
    token: p.GEO_TOKEN,
    baseURL: p.GEO_BASE_URL
  }
};
