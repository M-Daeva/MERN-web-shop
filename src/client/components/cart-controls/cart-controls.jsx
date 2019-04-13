import l from "../../services/log";
import React, { Component } from "react";
import styles from "./cart-controls.scss";
import cnInit from "jcm-classnames";
const cn = cnInit(styles);

class CartControls extends Component {
  state = { number: 0 };

  changeQuantity = e => {
    const {
      value,
      dataset: { type }
    } = e.target;

    this.setState(({ number }) => {
      const lookup = {
        dec: +number - 1,
        inc: +number + 1,
        val: +value
      }[type];

      if (lookup >= 0) return { number: `${lookup}` };
    });
  };

  render() {
    const {
      state: { number },
      changeQuantity
    } = this;

    return (
      <div className={cn("controls")} onClick={changeQuantity}>
        <div>
          <button data-type="dec" className={cn("btn")}>
            -
          </button>
          <input
            data-type="val"
            type="number"
            className={cn("input")}
            value={number}
            onChange={changeQuantity}
          />
          <button data-type="inc" className={cn("btn")}>
            +
          </button>
        </div>
        <span className={cn("info")}>В корзине {number} шт.</span>
      </div>
    );
  }
}

export default CartControls;
