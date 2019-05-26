import { createStore } from "redux";
import { imup, l } from "../../utils";

const getByID = (arr, id, prop) => {
  const elem = arr.find(({ id: _id }) => _id === id);
  if (prop === undefined) return elem || {};
  const [key, value] = Object.entries(prop)[0];
  return elem ? elem[key] : value;
};

const updateState = action => (...actionConstants) => {
  const { type, payload } = action;

  if (!reducer.actions) {
    reducer.actions = actionConstants.reduce((acc, cur) => {
      acc[cur] = payload => ({ type: cur, payload });
      return acc;
    }, {});
  }

  return actionConstants.includes(type) ? payload : {};
};

const getStore = () => {
  reducer();

  const { actions } = reducer,
    store = createStore(reducer);

  return { actions, store };
};

const initialState = {
  products: [],
  user: {
    cart: [],
    city: "",
    orders: []
  },
  form: {
    login: "",
    password: "",
    email: ""
  },
  isLoading: true,
  secret: undefined
};

function reducer(state = initialState, action = {}) {
  const newState = updateState(action)(
    "UPDATE_PRODUCTS",
    "UPDATE_CART",
    "UPDATE_CITY",
    "UPDATE_FORM",
    "TOGGLE_SPINNER",
    "GET_SECRET",
    "CREATE_ORDER",
    "UPDATE_ORDER_STATUS",
    "UPDATE"
  );

  return { ...state, ...newState };
}

const { store, actions } = getStore();

export { getByID, store, actions as default };
