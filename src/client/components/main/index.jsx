import React, { useEffect } from "react";
import { promisify, l, createRequest } from "../../../utils";
import { submit, $getCity, $getSuggestions } from "./functions";
import styles from "./index.scss";
import cnInit from "jcm-classnames";
const cn = cnInit(styles);
import { SuggInput } from "../connector";

const Main = props => {
  const {
      store: {
        user: { city },
        sugg: {
          city: { input, list }
        }
      },
      updateState
    } = props,
    getCity = () => $getCity(updateState);

  let el;

  const getRef = node => {
    el = node;
  };

  const up = async e => {
    const { value } = e.target,
      sug = await $getSuggestions(value);
    updateState({ list: sug });
  };

  const getList = () => {
    return list.map(item => <li key={item}>{item}</li>);
  };

  const setCity = e => {
    const { textContent: value, tagName } = e.target;
    if (tagName === "LI") {
      updateState({ list: [] });
      el.value = value;
    }
  };

  const getInps = e => {
    e.preventDefault();
    const inps = [...e.target.elements]
      .filter(({ tagName }) => tagName === "INPUT")
      .map(({ value }) => value);
    l(inps);
  };

  l(props.store.user);

  return (
    <div className={cn("main")}>
      <form onSubmit={submit}>
        <textarea className={cn("ta")} cols="30" rows="10" />
        <input className={cn("inp")} type="text" />
        <button className={cn("btn")}>send</button>
      </form>
      <p>
        Мой город: <span onClick={getCity}>{city}</span>
      </p>
      <form onSubmit={getInps}>
        <SuggInput target="city" />
        <SuggInput target="street" />
        <button>send</button>
      </form>
    </div>
  );
};

export default Main;
