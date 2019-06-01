import { l } from "../../../utils";
import ls from "../../services/ls";
import scrollRestorer from "../../services/scroll-restorer";

const prodSize = 10;

const $setState = async updateState => {
  let { products, user } = ls.get();
  if (prodSize) products = products.slice(0, prodSize);
  await updateState({ products, user, isLoading: false });
  scrollRestorer();
};

export { $setState };
