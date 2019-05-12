import React from "react";
import { connect } from "react-redux";
import actions from "../../state";
import ls from "../../services/ls";
import styles from "./cart.scss";
import cnInit from "jcm-classnames";
const cn = cnInit(styles);

const Cart = props => {
  const { token } = ls.get();

  const checkToken = () => {
    if (token) return <button className={cn("btn")}>Заказать</button>;
  };

  return (
    <div className={cn("cart")}>
      <p>Корзина</p>
      {checkToken()}
    </div>
  );
};

export default connect(
  state => state,
  actions
)(Cart);
