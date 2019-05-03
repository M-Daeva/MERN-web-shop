import l from "../../services/log";
import React from "react";
import { connect } from "react-redux";
import actions, { getByID } from "../../state";
import CartControls from "../cart-controls";
import styles from "./product.scss";
import cnInit from "jcm-classnames";
const cn = cnInit(styles);

const Product = props => {
  const { id, products } = props,
    { name, description, price, img } = getByID(products, id);

  return (
    <li className={cn("item")}>
      <h2>{name}</h2>
      <p className={cn("description")}>{description}</p>
      <img src={img} alt={description} />
      <p className={cn("price")}>{`${price} руб.`}</p>
      <CartControls {...{ id }} />
    </li>
  );
};

export default connect(
  state => state,
  actions
)(Product);
