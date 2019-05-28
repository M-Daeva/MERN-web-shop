import React, { useEffect } from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
  HashRouter
} from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../../state";
import ls from "../../services/ls";
import { req } from "../../services/request";
import { Navbar, Main, Products, Cart, Order } from "../connector";

const App = () => {
  useEffect(() => {
    (async () => {
      let { fingerprint } = ls.get();
      ({ fingerprint } = await req.post("/fingerprint", {
        fingerprint
      }));
      ls.set({ fingerprint });
    })();
  }, []);

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
