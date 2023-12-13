import { SET_LOGGED_IN_USER, SET_LOGGED_OUT_USER } from "../actions/userActions";
// import { SET_LOGGED_OUT_USER } from "../actions/userActions";

const initialState = {
  username: null,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOGGED_IN_USER:
      return {
        ...state,
        username: action.payload,
      };
    case SET_LOGGED_OUT_USER:
      return {
        ...state,
        username: null,
      };
    
    default:
      return state;
  }
};
