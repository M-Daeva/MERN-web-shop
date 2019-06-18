const nodemon = require("nodemon"),
  ngrok = require("ngrok"),
  { l } = require("./src/utils");

(async () => {
  const url = await ngrok.connect({
    proto: "http",
    addr: "3000"
  });

  l("Ngrok tunnel opened at " + url);

  nodemon({
    script: `./src/server/index.js`,
    env: {
      NGROK_URL: url,
      DOGE_DEV_URL: url + "/test"
    },
    exec: `node -r dotenv/config`
  });
})();
