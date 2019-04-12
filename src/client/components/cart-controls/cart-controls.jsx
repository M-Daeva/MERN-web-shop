import React, { Component } from "react";
import styles from "./cart-controls.scss";
import cnInit from "jcm-classnames";
const cn = cnInit(styles);

class CartControls extends Component {
  state = {};
  render() {
    return (
      <div id="cart-controls">
        <div>
          <button>-</button>
          <input />
          <button>+</button>
        </div>
        <span>В корзине х шт.</span>
      </div>
    );
  }
}

export default CartControls;
