import React, { useEffect } from "react";
import { $getSecret } from "./functions";
import styles from "./index.scss";
import cnInit from "jcm-classnames";
const cn = cnInit(styles);

const Cart = props => {
  const {
      store: { secret },
      updateState
    } = props,
    getSecret = () => $getSecret(updateState),
    renderSecret = () => {
      if (secret) return <button className={cn("btn")}>{secret}</button>;
    };

  useEffect(() => {
    getSecret();
  }, []);

  return (
    <div className={cn("cart")}>
      <p onClick={getSecret}>Корзина</p>
      {renderSecret()}
    </div>
  );
};

export default Cart;
