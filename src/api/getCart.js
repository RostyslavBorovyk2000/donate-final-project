import axios from "axios";
import store from "../redux/store";
import { setAuthToken } from "../redux/actions/authActions";
import { NEW_CART_URL } from "../endpoints/endpoints";


export default function getCart() {
  const { token } = store.getState().auth;
  store.dispatch(setAuthToken(token));

  // return axios.get(NEW_CART_URL);
  return axios.get(NEW_CART_URL)
    .then((response) => response)
    .catch((error) => {
      console.error("Помилка при отриманні кошика:", error);
      throw error;
    });
}
