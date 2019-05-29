import { connectToStore } from "../state";

const connect = obj => {
  const entries = Object.entries(obj);
  return entries.reduce((acc, cur) => {
    const [key, value] = cur,
      newKey = key.slice(1);
    acc[newKey] = connectToStore(value);
    return acc;
  }, {});
};

import App from "./app";
import $Cart from "./cart";
import $CartControls from "./cart-controls";
import $CartPrice from "./cart-price";
import $Main from "./main";
import $Navbar from "./navbar";
import $Order from "./order";
import $PopupOrder from "./popup-order";
import $Product from "./product";
import $Products from "./products";
import $Spinner from "./spinner";

const {
  Cart,
  CartControls,
  CartPrice,
  Main,
  Navbar,
  Order,
  PopupOrder,
  Product,
  Products,
  Spinner
} = connect({
  $Cart,
  $CartControls,
  $CartPrice,
  $Main,
  $Navbar,
  $Order,
  $PopupOrder,
  $Product,
  $Products,
  $Spinner
});

export {
  App as default,
  Cart,
  CartControls,
  CartPrice,
  Main,
  Navbar,
  Order,
  PopupOrder,
  Product,
  Products,
  Spinner
};
