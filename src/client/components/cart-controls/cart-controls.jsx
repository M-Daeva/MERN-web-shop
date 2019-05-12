import l from "../../services/log";
import ls from "../../services/ls";
import { req } from "../../services/request";
import React from "react";
import { connect } from "react-redux";
import actions, { getByID } from "../../state";
import styles from "./cart-controls.scss";
import cnInit from "jcm-classnames";
const cn = cnInit(styles);

const CartControls = props => {
  const { id, products, user, UPDATE_PRODUCTS, UPDATE_CART } = props,
    product = getByID(products, id);

  let quantity = getByID(user.cart, id, { quantity: 0 });

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

    // type convertion fixes input bug
    if (lookup >= 0) quantity = `${lookup}`;

    const { cart } = user;
    const oldProd = cart.filter(item => item.id !== id);
    const newProd = cart
      .filter(item => item.id === id)
      .map(item => ({ ...item, ...{ quantity } }));
    if (!newProd.length) newProd.push({ id, quantity });
    const total = [...oldProd, ...newProd];

    const newProduct = { ...product, quantity };
    const newProducts = products.map(product => {
      return product.id !== newProduct.id ? product : newProduct;
    });

    const newUser = { ...user, ...{ cart: total } };

    const { fingerprint } = ls.get();
    req.put("/db/users", { ...newUser, fingerprint });
    UPDATE_CART({ user: newUser });
    UPDATE_PRODUCTS({ products: newProducts });
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
