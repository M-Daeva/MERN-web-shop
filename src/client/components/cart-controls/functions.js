import { l, getByID } from "../../../utils";
import ls from "../../services/ls";
import { req } from "../../services/request";

const $getQuantity = (user, id) => getByID(user.cart, id, { quantity: 0 });

const $changeQuantity = (e, user, updateState, products, id) => {
  const product = getByID(products, id);
  let quantity = $getQuantity(user, id);

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
  updateState({ user: newUser });
  updateState({ products: newProducts });
};

export { $changeQuantity, $getQuantity };
