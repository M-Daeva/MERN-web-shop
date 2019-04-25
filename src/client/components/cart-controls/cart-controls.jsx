import l from "../../services/log";
import React from "react";
import { connect } from "react-redux";
import actions, { getByID } from "../../state";
import styles from "./cart-controls.scss";
import cnInit from "jcm-classnames";
const cn = cnInit(styles);

const CartControls = props => {
  const { children: id, products, UPDATE } = props,
    product = getByID(products, id);
  let { quantity } = product;

  const changeQuantity = e => {
    const {
      value,
      dataset: { type }
    } = e.target;

    const lookup = {
      dec: +quantity - 1,
      inc: +quantity + 1,
      val: +value
    }[type];

    if (lookup >= 0) quantity = `${lookup}`;

    const newProduct = { ...product, quantity };
    const newProducts = products.map(product => {
      return product.id !== newProduct.id ? product : newProduct;
    });
    UPDATE(newProducts);
  };

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
};

export default connect(
  state => state,
  actions
)(CartControls);
