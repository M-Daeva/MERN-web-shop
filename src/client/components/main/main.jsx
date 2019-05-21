import React, { useEffect } from "react";
import { req } from "../../services/request";
import l from "../../services/log";
import styles from "./main.scss";
import cnInit from "jcm-classnames";
const cn = cnInit(styles);

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

// const newOrder = {
//   status: "waiting for payment",
//   products: [
//     {
//       id,
//       quantity
//     }
//   ],
//   totalPrice,
//   delivery: {}
// }

const Main = () => {
  const onSubmit = async e => {
    e.preventDefault();

    const price = 5;
    const { timestamp } = await req.get("/test", {
      params: { price }
    });
    l(timestamp);

    const result = await checker(price, timestamp);
    l(result);
  };

  useEffect(() => {}, []);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <textarea className={cn("ta")} cols="30" rows="10" />
        <input className={cn("inp")} type="text" />
        <button className={cn("btn")}>send</button>
      </form>
    </div>
  );
};

export default Main;
