import React, { Component } from "react";
import "./products.scss";
import { all, add, get } from "../../services/request";
import l from "../../services/log";

class Products extends Component {
  state = {
    products: [
      {
        description: "arduino board",
        name: "arduino",
        img: "http://bit.do/eNAkv"
      },
      {
        description: "raspberry board",
        name: "raspberry",
        img: "http://bit.do/eNAk4"
      }
    ]
  };

  getProducts = () => {
    const { products } = this.state;
    return products.map(({ description, name, img }) => (
      <div id="item" key={description}>
        <h2>{name}</h2>
        <p>{description}</p>
        <img src={img} alt={description} />
      </div>
    ));
  };

  update = async () => {
    const data = {
      name: "eugene",
      phone: "+78676463543",
      email: "q@gmail.com",
      info: "wood"
    };
    //  const res = await all("/grabber");
    //  const res = await add("/telegram", data);
    // const res = await all("/users", data);
    const res = await get("/db", "users");
    l(res);
  };

  render() {
    const { getProducts, update } = this;

    return (
      <div id="products">
        <button onClick={update}>refresh data</button>
        {getProducts()}
      </div>
    );
  }
}

export default Products;
