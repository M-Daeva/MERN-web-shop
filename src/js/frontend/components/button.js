import React, { Component } from "react";
import pre from "pug-to-react-element";

const markup = `

div(id="d0")
  div(id="d1")
    div(id="d2")
    div(id="d21")
      div(id="d3")
    div(id="d4")
      div(id="d5" onClick={handler}) cnt = {cnt} y

`;

class Button extends Component {
	state = { cnt: 0, cnt2: 0 };

	handler = () => {
		let { cnt, cnt2 } = this.state;
		this.setState({ cnt: cnt + 1, cnt2: cnt2 + 5 });
	};

	render() {
		return pre.call(this, markup);
	}
}

export default Button;
