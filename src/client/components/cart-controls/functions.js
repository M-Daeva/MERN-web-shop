import { l, getByID } from "../../../utils";
import { req } from "../../services/request";

const $getQuantity = (user, id) => getByID(user.cart, id, { quantity: 0 });

const $changeQuantity = (e, user, updateState, id) => {
  const {
    value,
    dataset: { type }
  } = e.target;

  let quantity = $getQuantity(user, id);
  const lookup = {
    dec: +quantity - 1,
    inc: +quantity + 1,
    val: +value
  }[type];
  // type convertion fixes input bug
  if (lookup >= 0) quantity = `${lookup}`;

  const { cart } = user,
    targetProduct = getByID(cart, id),
    newProduct = { id, quantity };

  let newCart;
  if (!targetProduct) newCart = [...cart, newProduct];
  else
    newCart = cart.map(product => {
      return product.id === id ? newProduct : product;
    });
  newCart = newCart.filter(({ quantity }) => +quantity);

  updateState({ cart: newCart });
  req.put("/local-db/update-user-info", {
    ...user,
    cart: newCart
  });
};

export { $changeQuantity, $getQuantity };
