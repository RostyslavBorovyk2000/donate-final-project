import axios from "axios";
import store from "../redux/store";
import { setAuthToken } from "../redux/actions/authActions";
import { NEW_CART_URL } from "../endpoints/endpoints";

export default function updateCart(cartItemsFromLocalStorage) {
  const token = localStorage.getItem("token");
  store.dispatch(setAuthToken(token));
  
  const updatedCart = {
    products: cartItemsFromLocalStorage.map((item) => ({
      // eslint-disable-next-line no-underscore-dangle
      product: item._id,
      cartQuantity: item.cartQuantity,
    })),
  };

  axios.put(NEW_CART_URL, updatedCart);
  // ! below !
  // })
  //   .catch((error) => {
  //     // Логуємо помилку тут, але також репропагуємо її, щоб можна було обробити ззовні
  //     console.error("Помилка при оновленні кошика:", error);
  //     throw error;
  //   });
}

export function deleteCart() {
  const { token } = store.getState().auth;
  store.dispatch(setAuthToken(token));
  
  // const updatedFavorites = {
  //   products: [],
  // };

  axios.delete(NEW_CART_URL);
  // ! below !
  // })
  //   .catch((error) => {
  //     // Логуємо помилку тут, але також репропагуємо її, щоб можна було обробити ззовні
  //     console.error("Помилка при оновленні кошика:", error);
  //     throw error;
  //   });
}
