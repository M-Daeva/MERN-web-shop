import React, { useEffect } from "react";
import fns from "./functions";
import { l } from "../../../utils";
import { Product } from "../connector";
import styles from "./index.scss";
import cnInit from "jcm-classnames";
const cn = cnInit(styles);

const Cart = props => {
  const {
      store: {
        isAuthorized,
        user: { cart }
      },
      updateState
    } = props,
    { setState } = fns(updateState),
    renderSecret = () => {
      if (isAuthorized)
        return (
          <ul className={cn("list")}>
            {cart.map(({ id }) => (
              <Product key={id} {...{ id }} />
            ))}
          </ul>
        );
    };

  useEffect(() => {
    setState();
  }, []);

  return (
    <div className={cn("cart")}>
      <p>Корзина</p>
      {renderSecret()}
    </div>
  );
};

export default Cart;
