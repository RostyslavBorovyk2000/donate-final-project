import axios from "axios";
import { GET_PRODUCTS_URL } from "../endpoints/endpoints";


export const getProducts = (search = {}) => axios.get(GET_PRODUCTS_URL, { params: { search } })
  .then((response) => response.data);
