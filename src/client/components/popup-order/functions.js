import { l, getID } from "../../../utils";
import ls from "../../services/ls";
import { req } from "../../services/request";

const getCreditials = form => {
  const { login, password, email } = form;
  return { login, password, email };
};

const $createForm = updateState => {
  const { fingerprint = "empty" } = ls.get();
  const user = {
    login: "Ricardo",
    password: "qwerty",
    email: "milos@gmail.com",
    cart: [1, 5, 7],
    city: "Brazil",
    fingerprint
  };

  const newForm = getCreditials(user);

  updateState({
    form: newForm
  });

  return newForm;
};

const $updateForm = (e, updateState, form) => {
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
  const { fingerprint, token: oldToken } = ls.get();

  const newForm = getCreditials(form);

  const res = await req.post(
    "/db/users",
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
