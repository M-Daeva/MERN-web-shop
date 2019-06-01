import React, { useEffect } from "react";
import { l, logTime } from "../../../utils";
import { Spinner, Product, CartPrice } from "../connector";
import { $setState } from "./functions";
import styles from "./index.scss";
import cnInit from "jcm-classnames";
const cn = cnInit(styles);

const Products = props => {
  const {
      store: { products, isLoading },
      updateState
    } = props,
    setState = () => $setState(updateState);

  logTime("prod");
  useEffect(() => {
    logTime("prod ready");
    setState();
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

  return (
    <div className={cn("products")}>
      {<CartPrice {...{ products }} />}
      {renderProductList()}
    </div>
  );
};

export default Products;
