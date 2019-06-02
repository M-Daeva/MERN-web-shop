import { l, getByID, getByEntry, imup, imupar } from "../../../utils";
import { req } from "../../services/request";

const $getQuantity = (user, id) => getByID(user.cart, id, { quantity: 0 });

const _changeQuantity = (e, quantity) => {
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
  return quantity;
};

const $setState = (e, user, updateState, id) => {
  let quantity = $getQuantity(user, id);
  quantity = _changeQuantity(e, quantity);

  let { cart } = user;
  cart = imupar(cart, { quantity }, { id });
  cart = cart.filter(({ quantity }) => +quantity);
  updateState({ cart });

  user = imup(user, { cart });
  req.put("/local-db/update-user-info", user);
};

export { $setState, $getQuantity };
