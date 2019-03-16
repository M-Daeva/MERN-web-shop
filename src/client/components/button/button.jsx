import React, { Component } from "react";
import "./button.scss";
import * as req from "../../services/request-service";
import l from "../../services/log-sevice";
import shark from "./2.png";

class Button extends Component {
  state = {};

  getSomeShit = async () => {
    try {
      const get = await req.get("/"),
        post = await req.add("/", { name: "eugen" }),
        get2 = await req.all("/users"),
        get3 = await req.add("/telegram", { name: "eugen" });

      l(get);
      l(get2);
      l(get3);
    } catch (e) {
      l(e);
    }
  };

  render() {
    const { getSomeShit } = this;

    return (
      <>
        <button onClick={getSomeShit} className="button">
          Button
        </button>
        <img alt="img" src={shark} />
      </>
    );
  }
}

export default Button;
