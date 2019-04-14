import l from "../../services/log";
import React, { Component } from "react";
import CartControls from "../cart-controls";
import styles from "./product.scss";
import cnInit from "jcm-classnames";
const cn = cnInit(styles);

class Product extends Component {
  state = {};
  render() {
    const {
      props,
      props: {
        description,
        name,
        img,
        params,
        price,
        id,
        quantity,
        updateProduct
      }
    } = this;

    return (
      <li className={cn("item")}>
        <h2>{name}</h2>
        <p className={cn("description")}>{description}</p>
        <img src={img} alt={description} />
        <p className={cn("price")}>{`${price} коп.`}</p>
        <CartControls {...props} />
      </li>
    );
  }
}

export default Product;
