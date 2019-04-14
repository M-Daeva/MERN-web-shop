import l from "../../services/log";
import React, { Component } from "react";
import styles from "./cart-controls.scss";
import cnInit from "jcm-classnames";
const cn = cnInit(styles);

class CartControls extends Component {
  changeQuantity = e => {
    const {
      value,
      dataset: { type }
    } = e.target;

    let {
      props,
      props: { quantity, updateProduct }
    } = this;

    const lookup = {
      dec: +quantity - 1,
      inc: +quantity + 1,
      val: +value
    }[type];

    if (lookup >= 0) quantity = `${lookup}`;

    updateProduct({ ...props, quantity });
  };

  render() {
    const {
      changeQuantity,
      props: { id, price, quantity, updateProduct }
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
            value={quantity}
            onChange={changeQuantity}
          />
          <button data-type="inc" className={cn("btn")}>
            +
          </button>
        </div>
        <span className={cn("info")}>В корзине {quantity} шт.</span>
      </div>
    );
  }
}

export default CartControls;
