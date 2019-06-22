import { l, getID, imup } from "../../../utils";
import ls from "../../services/ls";
import { req } from "../../services/request";

export default (updateState, form) => {
  const _getCreditials = form => {
    const { login, password, email } = form;
    return { login, password, email };
  };

  const _createForm = () => {
    const { user = {} } = ls.get(),
      { fingerprint } = user;

    const newUser = {
      login: "John",
      password: "Doe",
      email: "john@gmail.com",
      cart: [],
      city: "London",
      fingerprint
    };

    return _getCreditials(newUser);
  };

  const updateForm = async e => {
    const {
      value,
      dataset: { type }
    } = e.target;

    form = imup(form, { [type]: value });
    updateState({ form });
  };

  const submit = async e => {
    e.preventDefault();
    let {
      user: { fingerprint },
      token
    } = ls.get();

    form = _getCreditials(form);

    const res = await req.post(
      "/local-db/auth",
      { ...form, fingerprint },
      { headers: { "x-auth-token": token } }
    );
    l(res);
    ({ token } = res);
    ls.set({ token });
  };

  const setState = async () => {
    let { user: { fingerprint, city } = {} } = ls.get(),
      { user } = await req.get("/local-db/preload-data", {
        params: { fingerprint }
      });
    ({ fingerprint, city } = user);

    ls.set({ user: { fingerprint, city } });

    const form = _createForm();

    updateState({
      user,
      form
    });
  };

  return { submit, updateForm, getID, setState };
};
