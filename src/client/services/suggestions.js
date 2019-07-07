import { createRequest } from "../../utils";

const getSuggestions = async (query, target, fias) => {
  const token = "36053df9adcbffffaf0801057e1621345dc45919",
    baseURL =
      "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address",
    req = createRequest({
      baseURL,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      }
    });

  const lookup = {
    city: "region_fias_id",
    street: "city_fias_id",
    house: "street_fias_id"
  };

  const location = { [lookup[target]]: fias };

  const { suggestions: res } = await req.post("", {
    query,
    count: 5,
    locations: [location],
    from_bound: { value: target },
    to_bound: { value: target }
  });
  const data = res.map(({ data, value }) => {
    const {
      city_with_type: city,
      fias_id: fias,
      region_with_type: region,
      street,
      house
    } = data;
    return { city, region, fias, value, street, house };
  });

  return data;
};

export default getSuggestions;
