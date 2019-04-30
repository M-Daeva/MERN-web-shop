const key = "MERNwebShop";

const set = (value) => localStorage.setItem(key, JSON.stringify(value));

const get = () => JSON.parse(localStorage.getItem(key)) || {};

const ls = { get, set };

export default ls;
