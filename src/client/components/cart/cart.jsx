import React, { useEffect } from "react";
import { connect } from "react-redux";
import actions from "../../state";
import { req } from "../../services/request";
import ls from "../../services/ls";
import l from "../../services/log";
import styles from "./cart.scss";
import cnInit from "jcm-classnames";
const cn = cnInit(styles);

const Cart = props => {
  const { secret, GET_SECRET } = props;

  const getSecret = async () => {
    try {
      const { token } = ls.get();
      const data = await req.get("/payment", {
        headers: { "x-auth-token": token }
      });
      GET_SECRET({ secret: data.info });
    } catch {
      l("no data");
    }
  };

  const getHeaders = async () => {
    try {
      const data = await req.get("/test");
      l(data);
    } catch {
      l("req err");
    }
  };

  const renderSecret = () => {
    if (secret) return <button className={cn("btn")}>{secret}</button>;
  };

  useEffect(() => {
    getHeaders();
    getSecret();
  }, []);

  return (
    <div className={cn("cart")}>
      <p onClick={getSecret}>Корзина</p>
      {renderSecret()}
    </div>
  );
};

export default connect(
  state => state,
  actions
)(Cart);
