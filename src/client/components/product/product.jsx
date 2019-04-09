import React, { Component } from "react";
import "./product.scss";
import CartControls from "../cart-controls";

class Product extends Component {
  state = {};
  render() {
    const {
      props: { description, name, img, params, price }
    } = this;

    return (
      <li id="item">
        <h2>{name}</h2>
        <p>{description}</p>
        <img src={img} alt={description} />
        <p>{`${price} коп.`}</p>
        <CartControls />
      </li>
    );
  }
}

export default Product;
