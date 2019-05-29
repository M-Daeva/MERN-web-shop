import { getByID, l } from "../../../utils";
import { req } from "../../services/request";
import ls from "../../services/ls";

const $calcTotalPrice = (cart, products) =>
  cart.reduce((acc, { id, quantity }) => {
    const price = getByID(products, id, { price: 0 });
    return acc + price * quantity;
  }, 0);

const $updateUserInfo = async updateState => {
  let { fingerprint } = ls.get();
  const { cart, city } = await req.get("/db/users", {
    params: { fingerprint }
  });
  updateState({ user: { cart, city } });
};

export { $calcTotalPrice, $updateUserInfo };
