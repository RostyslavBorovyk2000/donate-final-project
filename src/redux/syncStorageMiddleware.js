import axios from "axios";
import { setAuthToken } from "./actions/authActions";
import { NEW_CART_URL, NEW_FAVORITES_URL } from "../endpoints/endpoints";

export const syncStorageMiddleware = (storeAPI) => (next) => async (action) => {
  const result = next(action);

  const isUserLoggedIn = localStorage.getItem("userLogin");

  if (isUserLoggedIn && ["ADD_TO_CART", "REMOVE_FROM_CART", "ADD_FAVORITES", "REMOVE_FROM_FAVORITES", "UPDATE_CART_PRODUCT_QUANTITY", "UPDATE_CART_ITEM_SIZE"].includes(action.type)) {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthToken(token);
    }

    try {
      const cartResponse = await axios.get(NEW_CART_URL);
      const cartDataOnServer = cartResponse.data;
      const responseWishlist = await axios.get(NEW_FAVORITES_URL);
      const favoritesDataOnServer = responseWishlist.data;

      if (cartDataOnServer) {
        const cartItems = storeAPI.getState().cart.items;
        const updatedCartData = {
          products: cartItems.map((item) => ({
            // eslint-disable-next-line no-underscore-dangle
            product: item._id,
            cartQuantity: item.cartQuantity,
            selectedSize: item.selectedSize,
          })),
        };
        await axios.put(NEW_CART_URL, updatedCartData);
        localStorage.setItem("Cart", JSON.stringify(cartItems));
      }

      if (favoritesDataOnServer) {
        const favoritesItems = storeAPI.getState().favorites.items;
        const updatedFavoritesData = {
          products: favoritesItems.map((item) => (
            // eslint-disable-next-line no-underscore-dangle
            item._id
          )),
        };
        await axios.put(NEW_FAVORITES_URL, updatedFavoritesData);
        localStorage.setItem("Favorites", JSON.stringify(favoritesItems));
      }
    } catch (error) {
      console.error("Помилка при перевірці кошика на сервері:", error);
    }
  }

  return result;
};
