import { logTime } from "../utils";
logTime("root");

import "./services/preload";

import React from "react";
import ReactDOM from "react-dom";
import App from "./components/connector";

const root = document.querySelector("#root");
ReactDOM.render(<App />, root);
