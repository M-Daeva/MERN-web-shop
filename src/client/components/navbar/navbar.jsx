import React, { Component } from "react";
import { Link } from "react-router-dom";
import styles from "./navbar.scss";
import cnInit from "jcm-classnames";
const cn = cnInit(styles);

class Navbar extends Component {
  state = {};
  render() {
    return (
      <ul className={cn("navbar")}>
        <li className={cn("item")}>
          <Link className={cn("link")} to="/">
            Main
          </Link>
        </li>
        <li className={cn("item")}>
          <Link className={cn("link")} to="/products">
            Products
          </Link>
        </li>
        <li className={cn("item")}>
          <Link className={cn("link")} to="/cart">
            Cart
          </Link>
        </li>
        <li className={cn("item")}>
          <Link className={cn("link")} to="/order">
            Order
          </Link>
        </li>
      </ul>
    );
  }
}

export default Navbar;
