import ls from "./ls";
import { l, logTime } from "../../utils";
import { req } from "./request";

const getPreloadData = async () => {
  const { user: { fingerprint } = {} } = ls.get();
  const { products, user } = await req.get("/local-db/preload-data", {
    params: { fingerprint }
  });
  ls.set({ products, user });
  logTime("localstorage");
};

getPreloadData();
