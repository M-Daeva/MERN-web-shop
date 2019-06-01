import React, { useEffect } from "react";
import {
  $submit,
  $updateForm,
  $createForm,
  getCreditials,
  getID
} from "./functions";
import { l } from "../../../utils";
import styles from "./index.scss";
import cnInit from "jcm-classnames";
const cn = cnInit(styles);

const PopupOrder = props => {
  const {
      store: { form, user },
      updateState
    } = props,
    { login, password, email } = getCreditials(form),
    updateForm = e => $updateForm(e, updateState, form),
    createForm = () => $createForm(updateState),
    submit = e => $submit(e, form);

  useEffect(() => {
    createForm();
  }, []);

  const renderInput = creditialEntry => {
    const [[type, value]] = Object.entries(creditialEntry);

    return (
      <input
        key={type}
        className={cn("input")}
        type="text"
        data-type={type}
        onChange={updateForm}
        value={value}
      />
    );
  };

  return (
    <div className={cn("popup-order")}>
      <h2>Авторизация/Регистрация</h2>
      <form onSubmit={submit}>
        {[{ login }, { password }, { email }].map(renderInput)}

        <button className={cn("btn")}>Ввести</button>
      </form>
      <p>* Обязательно при регистрации</p>
    </div>
  );
};

export default PopupOrder;
