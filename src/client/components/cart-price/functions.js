import { getByID, l } from "../../../utils";

export default (cart, products) => {
  const calcTotalPrice = () =>
    cart.reduce((acc, { id, quantity }) => {
      const price = getByID(products, id, { price: 0 });
      return acc + price * quantity;
    }, 0);

  return { calcTotalPrice };
};
