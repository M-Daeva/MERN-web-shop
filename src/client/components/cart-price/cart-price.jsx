import l from "../../services/log";
import React, { Component } from "react";
import styles from "./cart-price.scss";
import cnInit from "jcm-classnames";
const cn = cnInit(styles);

class CartPrice extends Component {
  state = { color: "white", number: 0 };

  handler = () => {
    this.setState(({ color }) => {
      const res = color === "yellow" ? "white" : "yellow";
      return { color: res };
    });
  };

  render() {
    const {
      state: { color, number },
      props: { totalPrice },
      handler
    } = this;

    return (
      <h2 onClick={handler} className={cn("cartPrice", color)}>
        Товаров в корзине на сумму {totalPrice} коп.
      </h2>
    );
  }
}

export default CartPrice;
