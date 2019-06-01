import { req } from "../../services/request";
import ls from "../../services/ls";
import { l } from "../../../utils";

const $getSecret = async updateState => {
  try {
    const { token } = ls.get();
    const { isAuthorized } = await req.get("/local-db/secret", {
      headers: { "x-auth-token": token }
    });
    let { products, user } = ls.get();
    updateState({ isAuthorized, products, user });
  } catch (e) {}
};

export { $getSecret };
