import React, { Component } from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  NavLink,
  Redirect,
  HashRouter
} from "react-router-dom";
import styles from "./app.scss";
import cnInit from "jcm-classnames";
const cn = cnInit(styles);
import Main from "../main";
import Products from "../products";
import Order from "../order";
import Cart from "../cart";
import Navbar from "../navbar";

class App extends Component {
  state = {};
  render() {
    return (
      <HashRouter>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Main} />
          <Route path="/products" component={Products} />
          <Route path="/cart" component={Cart} />
          <Route path="/order" component={Order} />
          <Redirect to="/" />
        </Switch>
      </HashRouter>
    );
  }
}

export default App;
