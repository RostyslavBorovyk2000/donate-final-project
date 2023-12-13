export const SET_LOGGED_IN_USER = "SET_LOGGED_IN_USER";
export const SET_LOGGED_OUT_USER = "SET_LOGGED_OUT_USER";

export const setLoggedInUser = (username) => ({
  type: SET_LOGGED_IN_USER,
  payload: username,
});

export const setLoggedOutUser = () => ({
  type: SET_LOGGED_OUT_USER,
});
