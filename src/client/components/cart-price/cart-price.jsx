import l from "../../services/log";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import actions, { getByID } from "../../state";
import { ax2 } from "../../services/request";
import ls from "../../services/ls";
import styles from "./cart-price.scss";
import cnInit from "jcm-classnames";
const cn = cnInit(styles);

const CartPrice = props => {
  const {
    products = [],
    user: { cart },
    UPDATE_CART
  } = props;

  const calcTotalPrice = () =>
    cart.reduce((acc, { id, quantity }) => {
      const price = getByID(products, id, { price: 0 });
      return acc + price * quantity;
    }, 0);

  useEffect(() => {
    (async () => {
      let { fingerprint } = ls.get();
      ({ fingerprint } = await ax2.post("/fingerprint", {
        fingerprint
      }));
      l(fingerprint, "from server");
      ls.set({ fingerprint });
      const { cart: nCart, city: nCity } = await ax2.get("/users", {
        fingerprint
      });
      UPDATE_CART({ user: { cart: nCart, city: nCity } });
    })();
  }, []);

  l(props.user.cart.map(({ quantity }) => quantity));

  return (
    <h2 className={cn("cartPrice white")}>
      Товаров в корзине на сумму {calcTotalPrice()} руб.
    </h2>
  );
};

export default connect(
  state => state,
  actions
)(CartPrice);
