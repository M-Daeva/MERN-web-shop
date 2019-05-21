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
  } = require("./blockio"),
  {
    dogecoin: { label, label2, address, address2 }
  } = require("../config"),
  l = console.log.bind(console);

const { createRequest } = require("../services/request");

const url = "https://94bf7d7c.ngrok.io/test";

const request = createRequest({
  baseURL: url
});

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
  // const data = await withdrawFromLabels({
  //   amounts: 4,
  //   from_labels: label,
  //   to_labels: label2
  // });
  // const data = await getNetworkFeeEstimate({
  //   amounts: 5,
  //   to_addresses: address
  // });
  // const data = await createNotification({
  //   type: "address",
  //   address,
  //   url
  // });
  // const data = await deleteNotification({
  //   notification_id: "2c8bbb2ddf07cf8a5b2d2c55"
  // });
  // const check = async (body = {}) => {
  //   return new Promise(async resolve => {
  //     const store = await request.post("/", body);
  //     const { confirmations = 0 } = store[store.length - 1];
  //     if (confirmations >= 1) resolve(confirmations);
  //     setTimeout(check, 1000);
  //   });
  // };

  /*

  // create notification
  let { error_message, notification_id } = await createNotification({
    type: "address",
    address: address2,
    url
  });

  l("first", notification_id, error_message);

  if (error_message) {
    const del = await deleteNotification({
      notification_id
    });

    l("del", del);

    ({ notification_id } = await createNotification({
      type: "address",
      address: address2,
      url
    }));

    l("after del", notification_id);
  }
  l("notification", notification_id);
  // withdraw money
  const withdraw = await withdrawFromLabels({
    amounts: 2,
    from_labels: label,
    to_labels: label2
  });
  l("withdraw", withdraw);
  //  const conf = await check();
  //  l("request", conf);
  // const del = await deleteNotification({
  //   notification_id
  // });
  // l("del", del);

*/
  // delete old notifications
  const notifications = await getNotifications();
  for (let notification of notifications) {
    const { notification_id } = notification;
    await deleteNotification({
      notification_id
    });
  }
  const notifications2 = await getNotifications();
  l(notifications2);

  // create new notification
  const { notification_id } = await createNotification({
    type: "address",
    address: address2,
    url
  });
  l(notification_id);

  // withdraw money
  const withdraw = await withdrawFromLabels({
    amounts: 2,
    from_labels: label,
    to_labels: label2
  });
  l(withdraw);
};

run();
