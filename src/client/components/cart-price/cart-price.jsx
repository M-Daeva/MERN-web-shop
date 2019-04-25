import l from "../../services/log";
import React from "react";
import { connect } from "react-redux";
import actions from "../../state";
import styles from "./cart-price.scss";
import cnInit from "jcm-classnames";
const cn = cnInit(styles);

const CartPrice = props => {
  const { products = [] } = props;
  const calcTotalPrice = () =>
    products.reduce((acc, { price, quantity }) => acc + price * quantity, 0);

  return (
    <h2 className={cn("cartPrice white")}>
      Товаров в корзине на сумму {calcTotalPrice()} коп.
    </h2>
  );
};

export default connect(
  state => state,
  actions
)(CartPrice);
