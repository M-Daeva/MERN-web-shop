import React, { useEffect } from "react";
import { submit } from "./functions";
import styles from "./index.scss";
import cnInit from "jcm-classnames";
const cn = cnInit(styles);

const Main = props => {
  return (
    <div>
      <form onSubmit={submit}>
        <textarea className={cn("ta")} cols="30" rows="10" />
        <input className={cn("inp")} type="text" />
        <button className={cn("btn")}>send</button>
      </form>
    </div>
  );
};

export default Main;
