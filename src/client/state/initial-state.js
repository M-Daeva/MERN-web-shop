import ls from "../services/ls";

const prodSize = 10;

const loadFromStorage = () => {
  let { products } = ls.get();
  if (prodSize) products = products.slice(0, prodSize);
  products = products.map(product => {
    product.quantity = 0;
    product.id = product._id;
    delete product._id;
    delete product.__v;
    return product;
  });
  return products;
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
  isAuthorized: false
};

export default initialState;
