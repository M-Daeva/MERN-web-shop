const {
    getNewAddress,
    getBalance,
    getMyAddresses,
    getAddressBalance,
    getAddressByLabel,
    withdraw,
    withdrawFromAddresses,
    withdrawFromLabels,
    getNetworkFeeEstimate
  } = require("./blockio"),
  { label, label2, address, address2 } = require("../config").dogecoin,
  l = console.log.bind(console);

const run = async () => {
  // const data = await getNewAddress({ label: "lol" });
  // const data = await getBalance();
  //const data = await getMyAddresses();
  // const data = await getAddressBalance({ address: address });
  // const data = await getAddressByLabel({ label: label });
  // const data = await withdrawFromAddresses({
  //   amounts: 5,
  //   from_addresses: address,
  //   to_addresses: address2
  // });
  // const data = await withdraw({
  //   amounts: 4,
  //   to_addresses: address2
  // });

  // ????
  const data = await withdrawFromLabels({
    amounts: 4,
    from_labels: label,
    to_labels: label2
  });

  // const data = await getNetworkFeeEstimate({
  //   amounts: 5,
  //   to_addresses: address
  // });
  l(data);
};

//run();
