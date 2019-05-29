import React from "react";
import styles from "./index.scss";
import cnInit from "jcm-classnames";
const cn = cnInit(styles);

const Spinner = () => {
  return (
    <div className={cn("lds-gear")}>
      <div>
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
};

export default Spinner;
