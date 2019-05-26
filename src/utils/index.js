const axios = require("axios");

const l = console.log.bind(console);

const promisify = (fn, obj = null, key) => {
  return (...args) => {
    return new Promise((resolve, reject) => {
      fn.call(obj, ...args, (err, data) => {
        const res = key ? data[key] : data;
        err ? reject(err) : resolve(res);
      });
    });
  };
};

const createRequest = config => {
  const req = axios.create(config);

  class Request {
    get = async (url, params, config) =>
      (await req.get(url, { params }, config)).data;
    post = async (url, params, config) =>
      (await req.post(url, params, config)).data;
    put = async (url, params, config) =>
      (await req.put(url, params, config)).data;
    patch = async (url, params, config) =>
      (await req.patch(url, params, config)).data;
  }

  return new Request();
};

const getID = () => Date.now() + "" + Math.random();

// nested object immutable update function
const imup = (tree, entry) => {
  const [name] = Object.keys(entry);
  let temp,
    isFound = false;

  const loop = obj => {
    for (let key in obj) {
      if (key === name) {
        [temp, isFound] = [entry, true];
        break;
      }

      const value = obj[key];
      if (value.constructor === Object) {
        loop(value);
        if (isFound) {
          temp = { [key]: { ...value, ...temp } };
          break;
        }
      }
    }
  };

  loop(tree);

  return { ...tree, ...temp };
};

module.exports = { l, promisify, createRequest, getID, imup };
