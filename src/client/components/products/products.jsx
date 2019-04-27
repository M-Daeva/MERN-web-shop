import React, { useEffect } from "react";
import { connect } from "react-redux";
import actions from "../../state";
import { all, add, get } from "../../services/request";
import l from "../../services/log";
import Product from "../product";
import CartPrice from "../cart-price";
import scrollRestorer from "../../services/scroll-restorer";
import styles from "./products.scss";
import cnInit from "jcm-classnames";
const cn = cnInit(styles);

const prodSize = 10;

const Products = props => {
  const { products, UPDATE } = props;

  const createProductList = async () => {
    let products = await get("/db", "products");
    if (!products.length) await updateDB();
    if (prodSize) products = products.slice(0, prodSize);
    products = products.map(product => {
      product.quantity = 0;
      product.id = product._id;
      delete product._id;
      delete product.__v;
      return product;
    });
    UPDATE(products);
  };

  useEffect(() => {
    (async () => {
      await createProductList();
      scrollRestorer();
    })();
  }, []);

  const renderProductList = () => {
    if (!products) return <div>spinner</div>;
    return (
      <ul className={cn("list")}>
        {products.map(({ id }) => (
          <Product {...{ key: id, id }} />
        ))}
      </ul>
    );
  };

  const updateDB = async () => {
    const res = await all("/grabber");
    l(res);
    createProductList();
    //  const res = await add("/telegram", data);
    // const res = await all("/users", data);
    // const res = await get("/db", "users");
  };

  return (
    <div className={cn("products")}>
      <CartPrice {...{ products }} />
      {/*
          <button className={cn("db-update-btn")} onClick={updateDB}>
            refresh product list
          </button>*/}
      {renderProductList()}
    </div>
  );
};

export default connect(
  state => state,
  actions
)(Products);
