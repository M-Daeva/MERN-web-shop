import React, { useEffect } from "react";
import { Spinner, Product, CartPrice } from "../connector";
import { $updateDB, $init } from "./functions";
import styles from "./index.scss";
import cnInit from "jcm-classnames";
const cn = cnInit(styles);

const Products = props => {
  const {
      store: { products, isLoading },
      updateState
    } = props,
    updateDB = () => $updateDB(updateState),
    init = () => $init(updateState);

  useEffect(() => {
    init();
  }, []);

  const renderProductList = () => {
    return <Spinner />;
    return (
      <ul className={cn("list")}>
        {products.map(({ id }) => (
          <Product key={id} {...{ id }} />
        ))}
      </ul>
    );
  };

  return (
    <div className={cn("products")}>
      <CartPrice {...{ products }} />
      {
        // <button className={cn("db-update-btn")} onClick={updateDB}>
        //   refresh product list
        // </button>
      }
      {renderProductList()}
    </div>
  );
};

export default Products;
