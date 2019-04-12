import l from "../../services/log";
import React, { Component } from "react";
import styles from "./cart-price.scss";
import cnInit from "jcm-classnames";
const cn = cnInit(styles);

class CartPrice extends Component {
  state = { color: "red" };

  handler = () => {
    this.setState(({ color }) => {
      const res = color === "red" ? "blue" : "red";
      return { color: res };
    });
  };

  render() {
    const {
      state: { color },
      handler
    } = this;

    return (
      <h2 onClick={handler} className={cn("cartPrice  rounded", color)}>
        Товаров в корзине на сумму х коп.
      </h2>
    );
  }
}

export default CartPrice;
