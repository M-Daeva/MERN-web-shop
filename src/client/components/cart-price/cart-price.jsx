import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getByID, l } from "../../../utils";
import { connectToStore } from "../../state";
import { req } from "../../services/request";
import ls from "../../services/ls";
import styles from "./cart-price.scss";
import cnInit from "jcm-classnames";
const cn = cnInit(styles);

const CartPrice = props => {
  const {
    store: {
      products = [],
      user: { cart }
    },
    updateState
  } = props;

  const calcTotalPrice = () =>
    cart.reduce((acc, { id, quantity }) => {
      const price = getByID(products, id, { price: 0 });
      return acc + price * quantity;
    }, 0);

  useEffect(() => {
    (async () => {
      let { fingerprint } = ls.get();
      const { cart, city } = await req.get("/db/users", {
        params: { fingerprint }
      });
      updateState({ user: { cart, city } });
    })();
  }, []);

  // l(cart.map(({ quantity }) => quantity));

  return (
    <h2 className={cn("cartPrice white")}>
      Товаров в корзине на сумму {calcTotalPrice()} руб.
    </h2>
  );
};

export default connectToStore(CartPrice);
