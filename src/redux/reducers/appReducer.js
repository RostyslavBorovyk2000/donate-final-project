import { combineReducers } from "redux";
import { cartReducer, favoritesReducer } from "./cartReducer";
import { productReducer } from "./productReducer";
import { articleReducer } from "./articleReducer";
import { productsReducer } from "./productsReducer";
import { filtersReducer } from "./filtersReducer";
import inputReducer from "./inputReducer";
import { authReducer } from "./authReducer";
import errorReducer from "./errorReducer";
import { userReducer } from "./userReducer";
import modalReducer from "./modalReducer";

const appReducer = combineReducers({
  cart: cartReducer,
  favorites: favoritesReducer,
  product: productReducer,
  article: articleReducer,
  products: productsReducer,
  filters: filtersReducer,
  inputValue: inputReducer,
  auth: authReducer,
  showError: errorReducer,
  username: userReducer,
  modal: modalReducer,
});

export default appReducer;
