import axios from "axios";
import store from "../redux/store";
import { setAuthToken } from "../redux/actions/authActions";
import { NEW_FAVORITES_URL } from "../endpoints/endpoints";


export default function updateFavorites(favoritesItemsFromLocalStorage) {
  const { token } = store.getState().auth;
  store.dispatch(setAuthToken(token));
  
  const updatedFavorites = {
    products: favoritesItemsFromLocalStorage.map((item) => ({
      // eslint-disable-next-line no-underscore-dangle
      product: item._id,
    })),
  };

  axios.put(NEW_FAVORITES_URL, updatedFavorites);
}

export function deleteWishlist() {
  const { token } = store.getState().auth;
  store.dispatch(setAuthToken(token));

  axios.delete(NEW_FAVORITES_URL);
}
