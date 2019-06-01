import { l, getID } from "../../../utils";
import ls from "../../services/ls";
import { req } from "../../services/request";

const getCreditials = form => {
  const { login, password, email } = form;
  return { login, password, email };
};

const $createForm = updateState => {
  const { user = {} } = ls.get(),
    { fingerprint = "empty" } = user;

  const newUser = {
    login: "John",
    password: "Doe",
    email: "john@gmail.com",
    cart: [],
    city: "London",
    fingerprint
  };

  const newForm = getCreditials(newUser);

  updateState({
    form: newForm
  });
};

const $updateForm = async (e, updateState, form) => {
  const {
    value,
    dataset: { type }
  } = e.target;

  updateState({
    form: { ...form, [type]: value }
  });
};

const $submit = async (e, form) => {
  e.preventDefault();
  const {
      user: { fingerprint },
      token: oldToken
    } = ls.get(),
    newForm = getCreditials(form);

  const res = await req.post(
    "/local-db/auth",
    {
      ...newForm,
      fingerprint
    },
    {
      headers: { "x-auth-token": oldToken }
    }
  );
  l(res);
  const { token } = res;
  ls.set({ token });
};

export { $submit, $updateForm, $createForm, getCreditials, getID };
