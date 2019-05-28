import React, { useEffect } from "react";
import { connectToStore } from "../../state";
import { req } from "../../services/request";
import { l } from "../../../utils";
import Spinner from "../spinner";
import Product from "../product";
import CartPrice from "../cart-price";
import scrollRestorer from "../../services/scroll-restorer";
import styles from "./products.scss";
import cnInit from "jcm-classnames";
const cn = cnInit(styles);

const prodSize = 10;

const Products = props => {
  const {
    store: { products, isLoading },
    updateState
  } = props;

  const createProductList = async () => {
    let products = await req.get("/db/products");
    if (!products.length) await updateDB();
    if (prodSize) products = products.slice(0, prodSize);
    products = products.map(product => {
      product.quantity = 0;
      product.id = product._id;
      delete product._id;
      delete product.__v;
      return product;
    });
    updateState({ products });
  };

  useEffect(() => {
    (async () => {
      await createProductList();
      updateState({ isLoading: false });
      scrollRestorer();
    })();
  }, []);

  const renderProductList = () => {
    if (isLoading) return <Spinner />;
    return (
      <ul className={cn("list")}>
        {products.map(({ id }) => (
          <Product key={id} {...{ id }} />
        ))}
      </ul>
    );
  };

  const updateDB = async () => {
    const res = await req.get("/grabber");
    l(res);
    createProductList();
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

export default connectToStore(Products);
