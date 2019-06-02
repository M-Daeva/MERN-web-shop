import { req } from "../../services/request";
import ls from "../../services/ls";
import { l } from "../../../utils";

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

    updateState({ isAuthorized, products, user });
  } catch (e) {}
};

export { $setState };
