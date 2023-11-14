export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const ADD_FAVORITES = "ADD_FAVORITES";
export const REMOVE_FROM_FAVORITES = "REMOVE_FROM_FAVORITES";
export const INITIALIZE_CART = "INITIALIZE_CART";
export const INITIALIZE_FAVORITES = "INITIALIZE_FAVORITES";
export const RESET_CART = "RESET_CART";
export const RESET_FAVORITES = "RESET_FAVORITES";
// !
export const UPDATE_CART_PRODUCT = "UPDATE_CART_PRODUCT";
export const UPDATE_FAVORITES_PRODUCT = "UPDATE_FAVORITES_PRODUCT";
export const UPDATE_CART_PRODUCT_QUANTITY = "UPDATE_CART_PRODUCT_QUANTITY";


export const initializeCart = (products) => ({
  type: INITIALIZE_CART,
  payload: products,
});
export const addToCart = (product) => ({
  type: ADD_TO_CART,
  payload: product,
});
export const removeFromCart = (productId) => ({
  type: REMOVE_FROM_CART,
  payload: productId,
});
export const resetCart = () => ({
  type: RESET_CART,
});
export const updateCart = (product) => ({
  type: UPDATE_CART_PRODUCT,
  payload: product,
});

export const initializeFavorites = (products) => ({
  type: INITIALIZE_FAVORITES,
  payload: products,
});
export const addFavorites = (product) => ({
  type: ADD_FAVORITES,
  payload: product,
});
export const removeFavorites = (productId) => ({
  type: REMOVE_FROM_FAVORITES,
  payload: productId,
});
export const resetFavorites = () => ({
  type: RESET_FAVORITES,
});
export const updateFavorites = (product) => ({
  type: UPDATE_FAVORITES_PRODUCT,
  payload: product,
});


export const updateCartProductQuantity = (productId, newQuantity) => ({
  type: UPDATE_CART_PRODUCT_QUANTITY,
  payload: { productId, newQuantity },
});
