import React, { useEffect } from "react";
import { connect } from "react-redux";
import actions from "../../state";
import l from "../../services/log";
import ls from "../../services/ls";
import { ax2 } from "../../services/request";
import styles from "./popup-order.scss";
import cnInit from "jcm-classnames";
const cn = cnInit(styles);

const PopupOrder = props => {
  const { UPDATE_FORM, form } = props;

  const { fingerprint = "empty" } = ls.get();

  const { login, password, email } = form;
  const newForm = { login, password, email };

  useEffect(() => {
    const user = {
      login: "Ricardo",
      password: "qwerty",
      email: "milos@gmail.com",
      cart: [1, 5, 7],
      city: "Brazil",
      fingerprint
    };

    const { login, password, email } = user;
    const newForm = { login, password, email };

    UPDATE_FORM({
      form: newForm
    });
  }, []);

  const updateForm = e => {
    const {
      value,
      dataset: { type }
    } = e.target;

    UPDATE_FORM({
      form: { ...form, [type]: value }
    });
  };

  const submit = async e => {
    e.preventDefault();
    const { fingerprint, token: oldToken } = ls.get();
    const res = await ax2.post(
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

  return (
    <div className={cn("popup-order")}>
      <h2>Авторизация/Регистрация</h2>
      <form onSubmit={submit}>
        <input
          className={cn("input")}
          type="text"
          data-type="login"
          onChange={updateForm}
          value={login}
        />
        <input
          className={cn("input")}
          type="text"
          data-type="password"
          onChange={updateForm}
          value={password}
        />
        <input
          className={cn("input")}
          type="text"
          data-type="email"
          onChange={updateForm}
          value={email}
        />
        <button className={cn("btn")}>Ввести</button>
      </form>
      <p>* Обязательно при регистрации</p>
    </div>
  );
};

export default connect(
  state => state,
  actions
)(PopupOrder);
