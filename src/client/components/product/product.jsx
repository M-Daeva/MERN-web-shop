import React, { Component } from "react";
import "./product.scss";

class Product extends Component {
  state = {};
  render() {
    const {
      props: { description, name, img }
    } = this;

    return (
      <li id="item">
        <h2>{name}</h2>
        <p>{description}</p>
        <img src={img} alt={description} />
      </li>
    );
  }
}

export default Product;
