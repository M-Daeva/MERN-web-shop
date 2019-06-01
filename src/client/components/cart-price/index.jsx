import React from "react";
import { $calcTotalPrice } from "./functions";
import styles from "./index.scss";
import cnInit from "jcm-classnames";
const cn = cnInit(styles);

const CartPrice = props => {
  const {
      store: {
        products = [],
        user: { cart }
      }
    } = props,
    calcTotalPrice = () => $calcTotalPrice(cart, products);

  return (
    <h2 className={cn("cartPrice white")}>
      Товаров в корзине на сумму {calcTotalPrice()} руб.
    </h2>
  );
};

export default CartPrice;
