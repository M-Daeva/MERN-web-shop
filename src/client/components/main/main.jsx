import React, { useEffect } from "react";
import { connectToStore } from "../../state";
import { req } from "../../services/request";
import ls from "../../services/ls";
import { l, createRequest } from "../../../utils";
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

const Main = props => {
  const {
    updateState,
    UPDATE_CART,
    CREATE_ORDER,
    UPDATE_ORDER_STATUS,
    user
  } = props;

  const onSubmit = async e => {
    e.preventDefault();

    // const price = 5;
    // const { timestamp } = await req.get("/test", {
    //   params: { price }
    // });
    // l(timestamp);

    // const result = await checker(price, timestamp);
    // l(result);

    l(props.store);
    const {
      store: { products }
    } = props;
    const item = Math.round(10 * Math.random());
    const newProducts = [...products, item];
    updateState({ products: newProducts });
    //  UP({ city: "kaluga" });
  };

  useEffect(() => {
    (async () => {
      const { fingerprint } = ls.get();
      const { cart } = await req.get("/db/users", { params: { fingerprint } });
      //UPDATE_CART({ user: imup(user, { cart }) });
      //  l(cart);
    })();
  }, []);

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

export default connectToStore(Main);
