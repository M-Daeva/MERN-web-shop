const {
    withdrawFromLabels,
    createNotification,
    getNotifications,
    deleteNotification,
    getNewAddress,
    archiveAddresses
  } = require("../services/blockio"),
  {
    dogecoin: { label, label2, dogeURL }
  } = require("../config"),
  { l, getID } = require("../../utils");

let store = {};
let tempLabel;

const getHandler = async (req, res) => {
  const { price, timestamp } = req.query;

  if (timestamp) {
    const isConfirmed =
      !!store.confirmations &&
      +price === +store.amount_received &&
      timestamp < store.timestamp;

    if (isConfirmed) {
      // send money to main address
      const withdraw = await withdrawFromLabels({
        priority: "high",
        amounts: 2,
        from_labels: tempLabel,
        to_labels: label2
      });
      l(withdraw);

      // delete tempAddress after 30 min
      setTimeout(async () => {
        const del = await archiveAddresses({ label: tempLabel });
        l("deleted", del);

        // delete old notifications
        const notifications = await getNotifications();
        for (let notification of notifications) {
          const { notification_id } = notification;
          await deleteNotification({
            notification_id
          });
        }
      }, 15 * 60 * 1000);
    }

    res.send({ isConfirmed });
  } else {
    // delete old notifications
    const notifications = await getNotifications();
    for (let notification of notifications) {
      const { notification_id } = notification;
      await deleteNotification({
        notification_id
      });
    }

    // create temporary address
    tempLabel = getID();
    const { address: tempAddress } = await getNewAddress({ label: tempLabel });
    l("ta", tempAddress);

    // create notification for tempAddress
    const { notification_id } = await createNotification({
      type: "address",
      address: tempAddress,
      url: dogeURL
    });
    l(notification_id);

    // withdraw money
    const withdraw = await withdrawFromLabels({
      priority: "high",
      amounts: price,
      from_labels: label,
      to_labels: tempLabel
    });
    l(withdraw);

    const timestamp = Date.now();
    res.send({ timestamp });
  }
};

const postHandler = (req, res) => {
  const { data } = req.body;
  if (data) {
    data.timestamp = Date.now();
    store = data;
  }
  l(data);
  res.status(200).send("ok");
};

module.exports = { getHandler, postHandler };
