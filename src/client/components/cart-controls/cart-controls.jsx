import React, { Component } from "react";
import styles from "./cart-controls.scss";
import cnInit from "jcm-classnames";
const cn = cnInit(styles);

class CartControls extends Component {
  state = { number: 0 };

  render() {
    const {
      state: { number }
    } = this;

    return (
      <div className={cn("controls")}>
        <div>
          <button className={cn("btn")}>-</button>
          <input type="number" placeholder={0} className={cn("input")} />
          <button className={cn("btn")}>+</button>
        </div>
        <span className={cn("info")}>В корзине {number} шт.</span>
      </div>
    );
  }
}

export default CartControls;
