import l from "../../services/log";
import React, { Component } from "react";
import styles from "./cart-price.scss";
import cnInit from "jcm-classnames";
const cn = cnInit(styles);

class CartPrice extends Component {
  calcTotalPrice = () => {
    const {
      props: { products = [] }
    } = this;
    return products.reduce(
      (acc, { price, quantity }) => acc + price * quantity,
      0
    );
  };

  render() {
    const { calcTotalPrice } = this;

    return (
      <h2 className={cn("cartPrice white")}>
        Товаров в корзине на сумму {calcTotalPrice()} коп.
      </h2>
    );
  }
}

export default CartPrice;
