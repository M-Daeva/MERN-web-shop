import ls from "../../services/ls";
import { req } from "../../services/request";

const setFingerprint = async () => {
  let { fingerprint } = ls.get();
  ({ fingerprint } = await req.post("/fingerprint", {
    fingerprint
  }));
  ls.set({ fingerprint });
};

export { setFingerprint };
