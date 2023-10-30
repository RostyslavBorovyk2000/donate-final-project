import { combineReducers } from "redux";
import { cartReducer, favoritesReducer } from "./cartReducer";
import { productReducer } from "./productReducer";
import { productsReducer } from "./productsReducer";
import inputReducer from "./inputReducer";
import { authReducer } from "./authReducer";
import errorReducer from "./errorReducer";
import { userReducer } from "./userReducer";
import modalReducer from "./modalReducer";

const appReducer = combineReducers({
  cart: cartReducer,
  favorites: favoritesReducer,
  product: productReducer,
  products: productsReducer,
  inputValue: inputReducer,
  auth: authReducer,
  showError: errorReducer,
  username: userReducer,
  modal: modalReducer,
});

export default appReducer;
