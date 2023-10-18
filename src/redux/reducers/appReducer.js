import { combineReducers } from "redux";
// import counterReducer from "./counterReducer";
import {cartReducer,  favoritesReducer } from "./cartReducer";
import {productReducer, productsReducer} from "./productReducer";
import inputReducer from "./inputReducer";
import { authReducer } from "./authReducer";
import errorReducer from "./errorReducer"

const appReducer = combineReducers({
    cart: cartReducer,
    favorites: favoritesReducer,
    product: productReducer,
    products: productsReducer,
    inputValue: inputReducer,
    auth: authReducer,
    showError: errorReducer,
});

export default appReducer;