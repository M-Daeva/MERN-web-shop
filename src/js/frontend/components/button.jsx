import React, { Component } from "react";

class Button extends Component {
  state = { counter: 0 };

  handler = () => {
    this.setState({ counter: this.state.counter + 1 });
    console.log(77, this.state.counter);
  };

  render() {
    return (
      <div id="d0">
        <div id="d1">
          <div id="d2" />
          <div id="d21">
            <div id="d3" />
          </div>
          <div id="d4">
            <div id="d5" onClick={this.handler}>
              7 {this.state.counter}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Button;
