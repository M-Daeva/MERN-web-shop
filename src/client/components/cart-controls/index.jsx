import React from "react";
import { l } from "../../../utils";
import { $setState, $getQuantity } from "./functions";
import styles from "./index.scss";
import cnInit from "jcm-classnames";
const cn = cnInit(styles);

const CartControls = props => {
  const {
      id,
      store: { user },
      updateState
    } = props,
    quantity = $getQuantity(user, id),
    setState = e => $setState(e, user, updateState, id);

  return (
    <div className={cn("controls")} onClick={setState}>
      <div>
        <button data-type="dec" className={cn("btn")}>
          -
        </button>
        <input
          data-type="val"
          type="number"
          className={cn("input")}
          value={quantity}
          onChange={setState}
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
