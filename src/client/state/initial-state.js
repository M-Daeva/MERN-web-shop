import ls from "../services/ls";

const prodSize = 10;

const initialState = {
  products: [],
  user: {
    cart: [],
    city: "Москва",
    orders: [],
    address: {
      district: "",
      city: "",
      street: "",
      house: "",
      apartment: "",
      postcode: ""
    }
  },
  form: {
    login: "",
    password: "",
    email: ""
  },
  isLoading: true,
  isAuthorized: false,
  sugg: {
    region: {},
    city: {}
  }
};

export default initialState;
