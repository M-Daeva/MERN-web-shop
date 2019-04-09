import React, { Component } from "react";
import "./cart-controls.scss";

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
