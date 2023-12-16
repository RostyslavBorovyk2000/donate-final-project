import axios from "axios";
import store from "../redux/store";
import { setAuthToken } from "../redux/actions/authActions";
import { NEW_CART_URL } from "../endpoints/endpoints";


const selectCartForApi = (state) => state.cart.items.map((item) => ({
  // eslint-disable-next-line no-underscore-dangle
  product: item._id,
  // cartQuantity: item.quantity,
  cartQuantity: item.cartQuantity,
}));

export function sendCartToEmptyServer() {
  const token = localStorage.getItem("token");
  store.dispatch(setAuthToken(token));

  const state = store.getState();

  const newCart = {
    products: selectCartForApi(state),
  };

  axios
    .post(NEW_CART_URL, newCart)
    .then(null)
    .catch((err) => {
      console.log(err);
    });
}

export default function sendCart(cartItems) {
  const token = localStorage.getItem("token");
  // const { token } = store.getState().auth;
  store.dispatch(setAuthToken(token));

  const newCart = {
    products: cartItems.map((item) => ({
    // eslint-disable-next-line no-underscore-dangle
      product: item._id,
      cartQuantity: item.cartQuantity,
    })),
  };

  return axios.post(NEW_CART_URL, newCart);
}

export function editCart(cartItems) {
  const token = localStorage.getItem("token");
  // const { token } = store.getState().auth;
  store.dispatch(setAuthToken(token));

  const newCart = {
    products: cartItems.map((item) => ({
    // eslint-disable-next-line no-underscore-dangle
      product: item._id,
      cartQuantity: item.cartQuantity,
    })),
  };

  return axios.put(NEW_CART_URL, newCart);
}
