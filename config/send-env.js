require("dotenv").config({ path: "../.env" });
const { ENV_URL, ENV_AUTH_KEY } = process.env,
  { readFile } = require("fs"),
  { createRequest } = require("../src/server/services/request"),
  headers = {
    "Content-Type": "application/json",
    Accept: "application/vnd.heroku+json; version=3",
    Authorization: ENV_AUTH_KEY
  };

const req = createRequest({
  baseURL: ENV_URL,
  headers
});

const rf = (path, type = "utf-8") => {
  return new Promise(resolve => {
    readFile(path, type, (err, data) => {
      resolve(data);
    });
  });
};

const send = async () => {
  const file = await rf("../.env"),
    strings = file.split("\n").filter(data => data.trim()),
    envs = strings.reduce((acc, cur) => {
      const pair = cur.split("="),
        key = pair[0].trim(),
        value = pair[1].replace(/"/g, "").trim();

      acc[key] = key === "NODE_ENV" ? "production" : value;
      return acc;
    }, {});
  const res = await req.patch("/", envs);
  console.log(res);
};

send();
