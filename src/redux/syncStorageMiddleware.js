// ! 1
// export const syncStorageMiddleware = (store) => (next) => (action) => {
//   const result = next(action);
//   if (["ADD_TO_CART", "REMOVE_FROM_CART",
// "ADD_FAVORITES", "REMOVE_FROM_FAVORITES"].includes(action.type)) {
//     localStorage.setItem("Cart", JSON.stringify(store.getState().cart.items));
//     localStorage.setItem("Favorites", JSON.stringify(store.getState().favorites.items));
//   }
//   return result;
// };

// ! 2
// import axios from "axios";
// import { setAuthToken } from "./actions/authActions";
// import { NEW_CART_URL, NEW_FAVORITES_URL } from "../endpoints/endpoints";

// export const syncStorageMiddleware = () => (next) => async (action) => {
//   const result = next(action);
//   const isUserLoggedIn = localStorage.getItem("userLogin");

//   if (isUserLoggedIn) {
// eslint-disable-next-line max-len
//     if (["ADD_TO_CART", "REMOVE_FROM_CART", "ADD_FAVORITES", "REMOVE_FROM_FAVORITES"].includes(action.type)) {
//       const token = localStorage.getItem("token");
//       setAuthToken(token);
//       try {
//         const responseCart = await axios.get(NEW_CART_URL);
//         const responseWishlist = await axios.get(NEW_FAVORITES_URL);
        
//         if (responseCart.status === 200 && responseCart.data !== null) {
//           localStorage.setItem("Cart", JSON.stringify(responseCart.data.products));
//         }
//         if (responseWishlist.status === 200 && responseWishlist.data !== null) {
//           localStorage.setItem("Favorites", JSON.stringify(responseWishlist.data.products));
// eslint-disable-next-line max-len
//           // localStorage.setItem("Favorites", JSON.stringify(storeAPI.getState().favorites.items));
//         }
//       } catch (error) {
//         console.error("Помилка при оновленні даних з сервера:", error);
//       }
//     }
//   }


//   return result;
// };

import axios from "axios";
import { setAuthToken } from "./actions/authActions";
import { NEW_CART_URL, NEW_FAVORITES_URL } from "../endpoints/endpoints";

export const syncStorageMiddleware = (storeAPI) => (next) => async (action) => {
  const result = next(action);

  const isUserLoggedIn = localStorage.getItem("userLogin");

  if (isUserLoggedIn && ["ADD_TO_CART", "REMOVE_FROM_CART", "ADD_FAVORITES", "REMOVE_FROM_FAVORITES", "UPDATE_CART_PRODUCT_QUANTITY"].includes(action.type)) {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthToken(token);
    }

    // Отримуємо стан кошика з сервера
    try {
      const cartResponse = await axios.get(NEW_CART_URL);
      const cartDataOnServer = cartResponse.data;
      const responseWishlist = await axios.get(NEW_FAVORITES_URL);
      const favoritesDataOnServer = responseWishlist.data;

      // Перевіряємо, чи існує кошик на сервері
      if (cartDataOnServer) {
        const cartItems = storeAPI.getState().cart.items;
        const updatedCartData = {
          products: cartItems.map((item) => ({
            // eslint-disable-next-line no-underscore-dangle
            product: item._id,
            cartQuantity: item.cartQuantity,
          })),
        };

        // Оновлюємо кошик на сервері
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

        // Оновлюємо кошик на сервері
        await axios.put(NEW_FAVORITES_URL, updatedFavoritesData);
        localStorage.setItem("Favorites", JSON.stringify(favoritesItems));
      }
    } catch (error) {
      console.error("Помилка при перевірці кошика на сервері:", error);
    }
  }

  return result;
};
