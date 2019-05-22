const BlockIo = require("block_io"),
  { TEST_API_KEY, SECRET_PIN } = require("../config").dogecoin,
  { promisify } = require("../../utils");

const initBlockIo = (apiKey, secretPin) => {
  const blockio = new BlockIo(apiKey, secretPin),
    proto = BlockIo.prototype,
    props = Object.getOwnPropertyNames(proto);

  return props.reduce((acc, cur, i, arr) => {
    if (cur.match(/^_/)) return acc;
    const renamed = cur.replace(/_(\w)/g, (a, b) => b.toUpperCase()),
      fn = proto[arr[i]];
    acc[renamed] = promisify(fn, blockio, "data");
    return acc;
  }, {});
};

const {
  getNewAddress,
  getBalance,
  getMyAddresses,
  getAddressBalance,
  getAddressByLabel,
  withdraw,
  withdrawFromAddresses,
  withdrawFromLabels,
  getNetworkFeeEstimate,
  archiveAddresses,
  unarchiveAddresses,
  getMyArchivedAddresses,
  getCurrentPrice,
  getTransactions,
  getRawTransaction,
  isValidAddress,
  createNotification,
  disableNotification,
  enableNotification,
  getNotifications,
  getRecentNotificationEvents,
  deleteNotification
} = initBlockIo(TEST_API_KEY, SECRET_PIN);

module.exports = {
  getNewAddress,
  getBalance,
  getMyAddresses,
  getAddressBalance,
  getAddressByLabel,
  withdraw,
  withdrawFromAddresses,
  withdrawFromLabels,
  getNetworkFeeEstimate,
  archiveAddresses,
  unarchiveAddresses,
  getMyArchivedAddresses,
  getCurrentPrice,
  getTransactions,
  getRawTransaction,
  isValidAddress,
  createNotification,
  disableNotification,
  enableNotification,
  getNotifications,
  getRecentNotificationEvents,
  deleteNotification
};
