import l from "../../services/log";
import React, { Component } from "react";
import styles from "./cart-price.scss";
import cnInit from "jcm-classnames";
const cn = cnInit(styles);

class CartPrice extends Component {
  state = { color: "blue", number: 0 };

  handler = () => {
    this.setState(({ color }) => {
      const res = color === "red" ? "blue" : "red";
      return { color: res };
    });
  };

  render() {
    const {
      state: { color, number },
      handler
    } = this;

    return (
      <h2 onClick={handler} className={cn("cartPrice", color)}>
        Товаров в корзине на сумму {number} коп.
      </h2>
    );
  }
}

export default CartPrice;
