import axios from "axios";
import { setAuthToken } from "../redux/actions/authActions";
import { logIn } from "../redux/actions/loggedInActions";
import { setError } from "../redux/actions/errorActions";
import { LOGIN_URL, GET_CUSTOMER } from "../endpoints/endpoints";
import { setLoggedInUser } from "../redux/actions/userActions";
import { initializeCart, initializeFavorites } from "../redux/actions/cartActions";
import getCart from "./getCart";
import sendCart, { editCart } from "./sendCart";
import getFavorites from "./getFavorites";
import updateCart from "./updateCart";


async function getCustomerFromServer() {
  try {
    const response = await axios.get(GET_CUSTOMER);
    localStorage.setItem("isAdmin", `${response.data.isAdmin}`);
    return response.data.isAdmin;
  } catch (err) {
    console.error("Помилка при отриманні даних:", err);
    return null;
  }
}


const logInUser = (login, password) => async (dispatch) => {
  try {
    const userData = { loginOrEmail: login, password };
    const loginResult = await axios.post(LOGIN_URL, userData);

    if (loginResult.data.success) {
      const { token } = loginResult.data;
      dispatch(setLoggedInUser(login));
      localStorage.setItem("userLogin", login);
      localStorage.setItem("token", token);
      dispatch(setAuthToken(token));
      getCustomerFromServer();
      dispatch(logIn());

      const cartItems = JSON.parse(localStorage.getItem("Cart")) || [];
      const serverCart = await getCart();
      const serverFavorites = await getFavorites();
      
      if (serverCart.data === null && cartItems.length !== 0) {
        await sendCart(cartItems);
      } else if (serverCart.data === null && cartItems.length === 0) {
        // go ahead
      } else if (serverCart.data.products.length === 0) {
        // ! ?
        // ? or updateCart for better?
        await editCart(cartItems);
      } else if (serverCart.data.products.length > 0) {
        const serverCartItems = [];
        serverCart.data.products.map((i) => ({
          ...i.product,
          cartQuantity: i.cartQuantity,
        }));
        // TODO
        const updatedProducts = serverCart.data.products.map((i) => ({
          ...i.product,
          cartQuantity: i.cartQuantity,
        }));
        serverCartItems.push(...updatedProducts);
        const updatedCartItems = [...cartItems, ...serverCartItems];
        localStorage.setItem("Cart", JSON.stringify(updatedCartItems));
        dispatch(initializeCart(updatedCartItems));
        await updateCart(updatedCartItems);
        // TODO
      }

      if (serverFavorites.data === null) {
        // go ahead
      } else if (serverFavorites.data.products.length > 0) {
        const serverFavoritesItems = [];
        serverFavorites.data.products.map((i) => (
          serverFavoritesItems.push(i)
        ));
        const updatedFavoritesItems = [...serverFavoritesItems];
        localStorage.setItem("Favorites", JSON.stringify(updatedFavoritesItems));
        dispatch(initializeFavorites(updatedFavoritesItems));
      }
    }
  } catch (error) {
    if (error.response && error.response.data.loginOrEmail === "Customer not found") {
      dispatch(setError(true));
    } else {
      console.error("Помилка авторизації:", error);
    }
  }
};

export default logInUser;
