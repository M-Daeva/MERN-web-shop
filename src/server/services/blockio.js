const BlockIo = require("block_io"),
  { TEST_API_KEY, SECRET_PIN } = require("../config").dogecoin;

const wrapper = fn => (options = {}) => {
  return new Promise(resolve => {
    fn(options, (n, { data }) => {
      resolve(data);
    });
  });
};

const initBlockIo = (apiKey, secretPin) => {
  const blockio = new BlockIo(apiKey, secretPin),
    proto = BlockIo.prototype,
    props = Object.getOwnPropertyNames(proto);

  return props.reduce((acc, cur, i, arr) => {
    if (!cur.match(/^[a-z]+_[a-z]+/)) return acc;
    const renamed = cur.replace(/_(\w)/g, (a, b) => b.toUpperCase());
    acc[renamed] = wrapper(proto[arr[i]].bind(blockio));
    return acc;
  }, {});
};

const {
  getNewAddress,
  getBalance,
  getMyAddresses,
  getAddressBalance,
  getAddressByLabel
} = initBlockIo(TEST_API_KEY, SECRET_PIN);

module.exports = {
  getNewAddress,
  getBalance,
  getMyAddresses,
  getAddressBalance,
  getAddressByLabel
};
