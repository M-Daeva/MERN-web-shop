import { l } from "../../../utils";
import gs from "../../services/suggestions";

export default () => {
  const getSuggestions = async (query, target, fias) => {
    const data = await gs(query, target, fias);
    return data.map(({ value }) => value);
  };

  return { getSuggestions };
};
