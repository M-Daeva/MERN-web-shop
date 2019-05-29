import { l, createRequest } from "../../../utils";
import { req } from "../../services/request";
import ls from "../../services/ls";

const checker = async (price, timestamp, delay = 60000) => {
  let cnt = 0;
  return new Promise(resolve => {
    const run = async () => {
      const { isConfirmed = false } = await req.get("/test", {
        params: {
          price,
          timestamp
        }
      });
      l(isConfirmed, ++cnt);
      if (!isConfirmed) setTimeout(run, delay);
      else {
        // update state
        resolve("confirmed");
      }
    };

    run();
  });
};

const submit = async e => {
  e.preventDefault();

  const price = 5;
  const { timestamp } = await req.get("/test", {
    params: { price }
  });
  l(timestamp);

  const result = await checker(price, timestamp);
  l(result);
};

const updateOrder = async () => {
  // const { fingerprint } = ls.get();
  // const { cart } = await req.get("/db/users", { params: { fingerprint } });
};

export { submit, updateOrder };
