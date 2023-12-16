import axios from "axios";
import { GET_FILTERS_URL } from "../endpoints/endpoints";

export const getFilters = async (config) => {
  const response = await axios.get(GET_FILTERS_URL, config);
  return response.data;
};
