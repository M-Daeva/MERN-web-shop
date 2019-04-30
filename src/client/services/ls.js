const prop = "MERNwebShop";

const set = (obj) => localStorage.setItem(prop, JSON.stringify({ ...get(), ...obj }));

const get = () => JSON.parse(localStorage.getItem(prop)) || {};

const ls = { get, set };

export default ls;
