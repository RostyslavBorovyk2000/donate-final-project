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

  if (["ADD_TO_CART", "REMOVE_FROM_CART", "ADD_FAVORITES", "REMOVE_FROM_FAVORITES", "UPDATE_CART_PRODUCT_QUANTITY"].includes(action.type)) {
    const isUserLoggedIn = localStorage.getItem("userLogin");
    
    if (isUserLoggedIn) {
      const token = localStorage.getItem("token");
      setAuthToken(token);

      try {
        // Перетворення даних кошика для відправки на сервер
        const cartItems = storeAPI.getState().cart.items;
        const cartData = {
          products: cartItems.map((item) => ({
            // eslint-disable-next-line no-underscore-dangle
            product: item._id,
            cartQuantity: item.cartQuantity,
          })),
        };

        // Перетворення даних вибраного для відправки на сервер
        const wishlistItems = storeAPI.getState().favorites.items;
        const wishlistData = {
          products: wishlistItems.map((item) => ({
            // eslint-disable-next-line no-underscore-dangle
            product: item._id,
            wishlistQuantity: item.wishlistQuantity, // Припускаючи, що є таке поле
          })),
        };

        await Promise.all([
          axios.put(NEW_CART_URL, cartData),
          axios.put(NEW_FAVORITES_URL, wishlistData),
        ]);

        console.log(cartItems);
        // Оновлення локального сховища після успішного оновлення на сервері
        localStorage.setItem("Cart", JSON.stringify(cartItems));
        localStorage.setItem("Favorites", JSON.stringify(wishlistItems));
      } catch (error) {
        console.error("Помилка при оновленні даних з сервера:", error);
      }
    } else {
      // Якщо користувач не ввійшов у систему, використовуйте локальний стан з storeAPI
      localStorage.setItem("Cart", JSON.stringify(storeAPI.getState().cart.items));
      localStorage.setItem("Favorites", JSON.stringify(storeAPI.getState().favorites.items));
    }
  }

  return result;
};

