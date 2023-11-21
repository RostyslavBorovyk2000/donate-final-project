import axios from "axios";
import store from "../redux/store";
import { setAuthToken } from "../redux/actions/authActions";
import { NEW_CART_URL } from "../endpoints/endpoints";
// import getCart from "./getCart";


// const selectCartForApi = (state) => state.cart.items.map((item) => ({
//   // eslint-disable-next-line no-underscore-dangle
//   product: item._id,
//   cartQuantity: item.quantity,
// }));
// const state = store.getState();
// const newCart = {
//   products: selectCartForApi(state),
// };
// console.log(newCart);

export default function updateCart(cartItemsFromLocalStorage) {
  // const { token } = store.getState().auth;
  const token = localStorage.getItem("token");
  store.dispatch(setAuthToken(token));
  
  // return getCart().then((existingCartResponse) => {
  //   console.log(existingCartResponse);
  //   // Об'єднуємо існуючі елементи кошика з новими
  //   const existingCartItems = existingCartResponse.data.products || [];
  //   const updatedCartItems = [...existingCartItems, ...cartItemsFromLocalStorage];

  // Створюємо новий об'єкт кошика для відправлення на сервер
  const updatedCart = {
    products: cartItemsFromLocalStorage.map((item) => ({
      // eslint-disable-next-line no-underscore-dangle
      product: item._id,
      cartQuantity: item.cartQuantity,
    })),
  };

  // Виконуємо PUT-запит для оновлення кошика
  // return axios.put(NEW_CART_URL, updatedCart);
  // !
  axios.put(NEW_CART_URL, updatedCart);
  // ! below !
  // })
  //   .catch((error) => {
  //     // Логуємо помилку тут, але також репропагуємо її, щоб можна було обробити ззовні
  //     console.error("Помилка при оновленні кошика:", error);
  //     throw error;
  //   });
}
