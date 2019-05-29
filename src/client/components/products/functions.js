import { req } from "../../services/request";
import { l } from "../../../utils";
import scrollRestorer from "../../services/scroll-restorer";

const prodSize = 10;

const createProductList = async updateState => {
  let products = await req.get("/db/products");
  if (!products.length) await _updateDB();
  if (prodSize) products = products.slice(0, prodSize);
  products = products.map(product => {
    product.quantity = 0;
    product.id = product._id;
    delete product._id;
    delete product.__v;
    return product;
  });
  updateState({ products });
};

const $init = async updateState => {
  await createProductList(updateState);
  updateState({ isLoading: false });
  scrollRestorer();
};

const $updateDB = async updateState => {
  const res = await req.get("/grabber");
  l(res);
  createProductList(updateState);
};

export { $updateDB, $init };
