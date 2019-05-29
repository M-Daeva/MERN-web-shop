import React, { useEffect } from "react";
import {
  $submit,
  $updateForm,
  $createForm,
  getCreditials,
  getID
} from "./functions";
import styles from "./index.scss";
import cnInit from "jcm-classnames";
const cn = cnInit(styles);

const PopupOrder = props => {
  const {
      store: { form },
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
        key={getID()}
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
        {[login, password, email].map(item => renderInput({ [item]: item }))}
        <button className={cn("btn")}>Ввести</button>
      </form>
      <p>* Обязательно при регистрации</p>
    </div>
  );
};

export default PopupOrder;
