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

export default initialState;
