import React from "react";
import styles from "./spinner.scss";
import cnInit from "jcm-classnames";
import spinnerImg from "./lhtshow_dribbble.gif";
const cn = cnInit(styles);

const Spinner = () => {
  return (
    <div>
      <img className={cn("spinner")} src={spinnerImg} alt="spinner" />
    </div>
  );
};

export default Spinner;
