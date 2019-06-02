import ls from "../services/ls";

const prodSize = 10;

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
  isAuthorized: false
};

export default initialState;
