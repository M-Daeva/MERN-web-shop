const isProdMode = PROD_MODE;

const baseURL = isProdMode
  ? process.env.CLIENT_BASE_URL_PROD
  : process.env.CLIENT_BASE_URL_DEV;

const restURL = isProdMode
  ? process.env.CLIENT_REST_URL_PROD
  : process.env.CLIENT_REST_URL_DEV;

export { baseURL, restURL };
