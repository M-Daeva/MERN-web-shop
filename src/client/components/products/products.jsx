import React, { Component } from "react";
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

class Products extends Component {
  createProductList = async () => {
    const {
      updateDB,
      props: { UPDATE }
    } = this;
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

  componentDidMount = async () => {
    const { createProductList } = this;
    await createProductList();
    scrollRestorer();
  };

  renderProductList = () => {
    const { products } = this.props;
    if (!products) return <div>spinner</div>;

    return (
      <ul className={cn("list")}>
        {products.map(({ id }) => (
          <Product key={id}>{id}</Product>
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
      props: { products }
    } = this;

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
  }
}

export default connect(
  state => state,
  actions
)(Products);
