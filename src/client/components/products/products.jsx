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

class Products extends Component {
  state = { prices: [], totalPrice: 0 };

  priceUp = item => {
    this.setState(({ prices }) => {
      let newPrices = [...prices];
      newPrices = newPrices.filter(({ id }) => id !== item.id);
      newPrices.push(item);

      // let newTotalPrice = newPrices.reduce(
      //   (acc, cur) => acc.price + cur.price,
      //   0
      // );
      // if (isNaN(newTotalPrice)) newTotalPrice = newPrices[0].price;

      return { prices: newPrices };
    });
  };

  getProductList = async () => {
    const { updateDB } = this;
    let products = await get("/db", "products");
    if (!products.length) await updateDB();
    if (prodSize) products = products.slice(0, prodSize);
    this.setState({ products });
  };

  componentDidMount = async () => {
    const { getProductList } = this;
    await getProductList();
    scrollRestorer();
  };

  getProducts = () => {
    const {
      state: { products },
      priceUp
    } = this;
    if (!products) return <div>spinner</div>;

    return (
      <ul className={cn("list")}>
        {products.map(({ description, params, price, name, img, _id }) => (
          <Product
            {...{
              key: _id,
              id: _id,
              description,
              name,
              img,
              params,
              price,
              priceUp
            }}
          />
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
    const {
      getProducts,
      updateDB,
      state: { totalPrice }
    } = this;

    return (
      <div className={cn("products")}>
        <CartPrice {...{ totalPrice }} />
        {/*
          <button className={cn("db-update-btn")} onClick={updateDB}>
            refresh product list
          </button>
        */}
        {getProducts()}
      </div>
    );
  }
}

export default Products;
