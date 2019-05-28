import { connectToStore as c } from "../state";

import App from "./app/app";
import Cart from "./cart/cart";
import CartControls from "./cart-controls/cart-controls";
import CartPrice from "./cart-price/cart-price";
import Main from "./main/main";
import Navbar from "./navbar/navbar";
import Order from "./order/order";
import PopupOrder from "./popup-order/popup-order";
import Product from "./product/product";
import Products from "./products/products";
import Spinner from "./spinner/spinner";

const _Cart = c(Cart),
  _CartControls = c(CartControls),
  _CartPrice = c(CartPrice),
  _Main = c(Main),
  _Navbar = c(Navbar),
  _Order = c(Order),
  _PopupOrder = c(PopupOrder),
  _Product = c(Product),
  _Products = c(Products),
  _Spinner = c(Spinner);

export {
  App as default,
  _Cart as Cart,
  _CartControls as CartControls,
  _CartPrice as CartPrice,
  _Main as Main,
  _Navbar as Navbar,
  _Order as Order,
  _PopupOrder as PopupOrder,
  _Product as Product,
  _Products as Products,
  _Spinner as Spinner
};
