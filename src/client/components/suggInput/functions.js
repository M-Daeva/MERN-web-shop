import { l } from "../../../utils";
import getSuggestions from "../../services/suggestions";

const $getSuggestions = async (query, target, fias) => {
  const data = await getSuggestions(query, target, fias);
  return data.map(({ value }) => value);
};

export { $getSuggestions };
