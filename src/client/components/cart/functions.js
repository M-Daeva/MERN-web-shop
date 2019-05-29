import { req } from "../../services/request";
import ls from "../../services/ls";
import { l } from "../../../utils";

const $getSecret = async updateState => {
  try {
    const { token } = ls.get();
    const data = await req.get("/payment", {
      headers: { "x-auth-token": token }
    });
    updateState({ secret: data.info });
  } catch {
    l("no data");
  }
};

export { $getSecret };
