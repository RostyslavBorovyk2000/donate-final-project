import axios from "axios";
import { setAuthToken } from "../redux/actions/authActions";
import { logIn } from "../redux/actions/loggedInActions";
import { setError } from "../redux/actions/errorActions";
import { LOGIN_URL, GET_CUSTOMER } from "../endpoints/endpoints";
import { setLoggedInUser } from "../redux/actions/userActions";
import { initializeCart } from "../redux/actions/cartActions";
import sendCart from "./sendCart";
import getCart from "./getCart";
import updateCart from "./updateCart";


async function getFavoritesFromServer() {
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
      getFavoritesFromServer();
      dispatch(logIn());

      const cartItems = JSON.parse(localStorage.getItem("Cart")) || [];
      const serverCart = await getCart();
      
      // !
      if (serverCart.data === null && cartItems.length !== 0) {
        await sendCart(cartItems);
      } else if (serverCart.data === null && cartItems.length === 0) {
        // go ahead
      } else if (serverCart.data.products.length > 0) {
        const serverCartItems = [];
        serverCart.data.products.map((i) => (
          serverCartItems.push(i.product)
        ));
        const updatedCartItems = [...cartItems, ...serverCartItems];
        localStorage.setItem("Cart", JSON.stringify(updatedCartItems));
        dispatch(initializeCart(updatedCartItems));
        await updateCart(updatedCartItems);
      }
      // else if (serverCart.data.products.length < 0) {
      //   console.log(serverCart.data.products);
      //   console.log("0");
      // }
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
