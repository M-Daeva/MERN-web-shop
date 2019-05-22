const { URL, AUTH_KEY } = require("./server").env,
  { promisify, createRequest, l } = require("../src/utils"),
  { readFile } = require("fs"),
  headers = {
    "Content-Type": "application/json",
    Accept: "application/vnd.heroku+json; version=3",
    Authorization: AUTH_KEY
  };

const req = createRequest({
  baseURL: URL,
  headers
});

const send = async () => {
  const file = await promisify(readFile)("../.env", "utf-8"),
    strings = file.split("\n").filter(data => data.trim()),
    envs = strings.reduce((acc, cur) => {
      const pair = cur.split("="),
        key = pair[0].trim(),
        value = pair[1].replace(/"/g, "").trim();

      acc[key] = key === "NODE_ENV" ? "production" : value;
      return acc;
    }, {});
  const res = await req.patch("/", envs);
  l(res);
};

send();
