import React, { Component } from "react";
import { all, add, get } from "../../services/request";
import l from "../../services/log";
import Product from "../product";
import CartPrice from "../cart-price";
import scrollRestorer from "../../services/scroll-restorer";
import styles from "./products.scss";
import cnInit from "jcm-classnames";
const cn = cnInit(styles);

const prodSize = 10;

const copy = val => JSON.parse(JSON.stringify(val));

class Products extends Component {
  state = {};

  updateProduct = newProduct => {
    this.setState(({ products }) => {
      let mirror = copy(products);
      mirror = mirror.map(product => {
        if (product.id !== newProduct.id) return product;
        return newProduct;
      });
      return { products: mirror };
    });
  };

  createProductList = async () => {
    const { updateDB } = this;
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
    this.setState({ products });
  };

  componentDidMount = async () => {
    const { createProductList } = this;
    await createProductList();
    scrollRestorer();
  };

  renderProductList = () => {
    const {
      state: { products },
      updateProduct
    } = this;
    if (!products) return <div>spinner</div>;

    return (
      <ul className={cn("list")}>
        {products.map(product => (
          <Product
            {...{
              key: product.id,
              ...product,
              updateProduct
            }}
          />
        ))}
      </ul>
    );
  };

  updateDB = async () => {
    const { createProductList } = this;
    const res = await all("/grabber");
    l(res);
    createProductList();
    //  const res = await add("/telegram", data);
    // const res = await all("/users", data);
    // const res = await get("/db", "users");
  };

  render() {
    const {
      renderProductList,
      updateDB,
      state: { products }
    } = this;

    return (
      <div className={cn("products")}>
        <CartPrice {...{ products }} />
        {/*
          <button className={cn("db-update-btn")} onClick={updateDB}>
            refresh product list
          </button>
        */}
        {renderProductList()}
      </div>
    );
  }
}

export default Products;
