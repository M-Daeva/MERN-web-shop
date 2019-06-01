import { getByID, l } from "../../../utils";

const $calcTotalPrice = (cart, products) =>
  cart.reduce((acc, { id, quantity }) => {
    const price = getByID(products, id, { price: 0 });
    return acc + price * quantity;
  }, 0);

export { $calcTotalPrice };
