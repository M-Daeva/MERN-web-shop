import React, { Component } from "react";
import "./products.scss";
import { all, add, get } from "../../services/request";
import l from "../../services/log";
import Product from "../product";

class Products extends Component {
  state = {};

  getProductList = async () => {
    const { updateDB } = this;
    const products = await get("/db", "products");
    if (!products.length) await updateDB();
    this.setState({ products });
  };

  componentDidMount = async () => {
    const { getProductList } = this;
    await getProductList();
  };

  getProducts = () => {
    const {
      state: { products }
    } = this;
    if (!products) return <div>spinner</div>;

    return (
      <ul id="product-list">
        {products.map(({ description, params, price, name, img, _id }) => (
          <Product {...{ key: _id, description, name, img, params, price }} />
        ))}
      </ul>
    );
  };

  updateDB = async () => {
    const { getProductList } = this;
    const res = await all("/grabber");
    l(res);
    getProductList();
    //  const res = await add("/telegram", data);
    // const res = await all("/users", data);
    // const res = await get("/db", "users");
  };

  render() {
    const { getProducts, updateDB } = this;

    return (
      <div id="products">
        <button onClick={updateDB}>refresh product list</button>
        {getProducts()}
      </div>
    );
  }
}

export default Products;
