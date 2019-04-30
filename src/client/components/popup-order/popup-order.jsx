import React from "react";
import l from "../../services/log";
import { add } from "../../services/request";
import styles from "./popup-order.scss";
import cnInit from "jcm-classnames";
const cn = cnInit(styles);

const PopupOrder = () => {
  const submit = async e => {
    e.preventDefault();
    const user = {
      login: "Rickardo",
      password: "rtui",
      email: "yu@io.ru",
      cart: [1, 5, 7],
      city: "London"
    };
    const res = await add("/db/users", user);
    l(res);
  };

  return (
    <div className={cn("popup-order")}>
      <h2>Авторизация/Регистрация</h2>
      <form onSubmit={submit}>
        <input className={cn("input")} type="text" placeholder="Логин" />
        <input className={cn("input")} type="text" placeholder="Пароль" />
        <input className={cn("input")} type="text" placeholder="email*" />
        <button className={cn("btn")}>Ввести</button>
      </form>
      <p>* Обязательно при регистрации</p>
    </div>
  );
};

export default PopupOrder;
