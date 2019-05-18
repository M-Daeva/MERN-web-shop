const {
    getNewAddress,
    getBalance,
    getMyAddresses,
    getAddressBalance,
    getAddressByLabel
  } = require("./blockio"),
  { label, label2, address, address2 } = require("../config").dogecoin,
  l = console.log.bind(console);

const run = async () => {
  // const data = await getNewAddress({ label: "lol" });
  // const data = await getBalance();
  //const data = await getMyAddresses();
  // const data = await getAddressBalance({ address: address });
  // const data = await getAddressByLabel({ label: label });
  //l(data);
};

run();
