import React, { useEffect } from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
  HashRouter
} from "react-router-dom";
import Main from "../main";
import Products from "../products";
import Order from "../order";
import Cart from "../cart";
import Navbar from "../navbar";
import { Provider } from "react-redux";
import { store } from "../../state";
import ls from "../../services/ls";
import { req } from "../../services/request";
import styles from "./app.scss";
import cnInit from "jcm-classnames";
const cn = cnInit(styles);
console.log(7);
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
    <Provider store={store}>
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
