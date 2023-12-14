import {
  SET_PRODUCT,
} from "../actions/productActions";

const initialState = {
  product: null,
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCT:
      return {
        ...state,
        product: action.payload,
      };
    default:
      return state;
  }
};
