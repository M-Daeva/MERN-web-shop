import React from "react";
import { $changeQuantity, $getQuantity } from "./functions";
import styles from "./index.scss";
import cnInit from "jcm-classnames";
const cn = cnInit(styles);

const CartControls = props => {
  const {
      id,
      store: { products, user },
      updateState
    } = props,
    quantity = $getQuantity(user, id),
    changeQuantity = e => $changeQuantity(e, user, updateState, products, id);

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

export default CartControls;
