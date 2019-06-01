import React from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
  HashRouter
} from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../../state";
import { Navbar, Main, Products, Cart, Order } from "../connector";

const App = () => {
  return (
    <Provider {...{ store }}>
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
    </Provider>
  );
};

export default App;
