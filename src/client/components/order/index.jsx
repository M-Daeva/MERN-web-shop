import React from "react";
import { PopupOrder } from "../connector";
import styles from "./index.scss";
import cnInit from "jcm-classnames";
const cn = cnInit(styles);

const Order = () => {
  return <PopupOrder />;
};

export default Order;
