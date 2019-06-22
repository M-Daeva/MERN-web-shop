import React, { Component, useEffect, useState } from "react";
import { l } from "../../../utils";
import fns from "./functions";
import styles from "./index.scss";
import cnInit from "jcm-classnames";
const cn = cnInit(styles);

const SuggInput = props => {
  const { target } = props;
  let el;
  const [list, updateList] = useState([]),
    { getSuggestions } = fns();

  const getRef = node => (el = node);

  const up = async e => {
    const { value } = e.target,
      list = await getSuggestions(value, target);
    l(list);
    updateList(list);
  };

  const getList = () => {
    return list.map(item => <li key={item}>{item}</li>);
  };

  const blur = () => {
    setTimeout(() => updateList([]), 100);
  };

  const setCity = e => {
    const { textContent: value, tagName } = e.target;
    if (tagName === "LI") el.value = value;
  };

  return (
    <div className={cn("inp")}>
      <input
        ref={getRef}
        onChange={up}
        onFocus={up}
        onBlur={blur}
        type="text"
      />
      <ul onClick={setCity}>{getList()}</ul>
    </div>
  );
};

export default SuggInput;
