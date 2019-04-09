import React, { Component } from "react";
import "./cart-price.scss";

class CartPrice extends Component {
  state = {};
  render() {
    return <h2 id="cart-price">Товаров в корзине на сумму х коп.</h2>;
  }
}

export default CartPrice;
