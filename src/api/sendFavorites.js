import axios from "axios";
import store from "../redux/store";
import { setAuthToken } from "../redux/actions/authActions";
import { NEW_FAVORITES_URL } from "../endpoints/endpoints";


const selectFavoritesForApi = (state) => state.favorites.items.map((item) => (
  // eslint-disable-next-line no-underscore-dangle
  item._id
));

export function sendFavoritesToEmptyServer() {
  const token = localStorage.getItem("token");
  store.dispatch(setAuthToken(token));
  const state = store.getState();

  const newFavorites = {
    products: selectFavoritesForApi(state),
  };

  axios
    .post(NEW_FAVORITES_URL, newFavorites)
    .then(null)
    .catch((err) => {
      console.log(err);
    });
}

export default function sendFavorites(cartItems) {
  const token = localStorage.getItem("token");
  store.dispatch(setAuthToken(token));

  const newFavorites = {
    products: cartItems.map((item) => ({
    // eslint-disable-next-line no-underscore-dangle
      product: item._id,
    })),
  };

  return axios.post(NEW_FAVORITES_URL, newFavorites);
}
