import React from "react";
import { Link } from "react-router-dom";
import styles from "./index.scss";
import cnInit from "jcm-classnames";
const cn = cnInit(styles);

const Navbar = () => {
  return (
    <ul className={cn("navbar")}>
      <li className={cn("item")}>
        <Link className={cn("link")} to="/">
          Главная
        </Link>
      </li>
      <li className={cn("item")}>
        <Link className={cn("link")} to="/products">
          Каталог
        </Link>
      </li>
      <li className={cn("item")}>
        <Link className={cn("link")} to="/cart">
          Корзина
        </Link>
      </li>
      <li className={cn("item")}>
        <Link className={cn("link")} to="/order">
          Регистрация
        </Link>
      </li>
    </ul>
  );
};

export default Navbar;
