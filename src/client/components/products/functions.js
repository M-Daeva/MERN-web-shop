import { l, imup } from "../../../utils";
import ls from "../../services/ls";
import { req } from "../../services/request";
import scrollRestorer from "../../services/scroll-restorer";

const prodSize = 10;

const $setState = async updateState => {
  try {
    let { token, user: { fingerprint, city } = {} } = ls.get(),
      { isAuthorized, products, user } = await req.get(
        "/local-db/preload-data",
        {
          headers: { "x-auth-token": token },
          params: { fingerprint }
        }
      );

    ({ fingerprint, city } = user);

    ls.set({ user: { fingerprint, city } });

    if (prodSize) products = products.slice(0, prodSize);

    updateState({
      products,
      user,
      isLoading: false,
      isAuthorized
    });
    // scrollRestorer();
  } catch (e) {}
};

export { $setState };
