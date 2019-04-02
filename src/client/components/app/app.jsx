import React, { Component } from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  NavLink,
  Redirect,
  HashRouter
} from "react-router-dom";
import "./app.scss";
import Main from "../main";
import Goods from "../goods";
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
          <Route path="/goods" component={Goods} />
          <Route path="/cart" component={Cart} />
          <Route path="/order" component={Order} />
          <Redirect to="/" />
        </Switch>
      </HashRouter>
    );
  }
}

export default App;
