import axios from "axios";
import { setAuthToken } from "../redux/actions/authActions";
import { setError } from "../redux/actions/errorActions";
import { REGISTRATION_URL } from "../endpoints/endpoints";

const registrationUser = (
  firstName,
  lastName,
  login,
  email,
  password,
  telephone,
  birthdate,
  isAdmin,
) => (dispatch) => {
  const userData = {
    firstName,
    lastName,
    login,
    email,
    password,
    isAdmin,
    telephone,
    birthdate,
  };

  return axios
    .post(REGISTRATION_URL, userData)
    .then((loginResult) => {
      if (loginResult.data.success === true) {
        dispatch(setAuthToken(loginResult.token));
      }
    })
    .catch((err) => {
      if (err.response && err.response.data) {
        if (err.response.data.login === "Login must be between 3 and 10 characters") {
          dispatch(setError("Логін має містити від 3 до 10 символів"));
        } else if (err.response.data.login === "Allowed characters for login is a-z, A-Z, 0-9.") {
          dispatch(setError("Дозволені символи для логіна a-z, A-Z, 0-9"));
        } else if (err.response.data.password === "Allowed characters for password is a-z, A-Z, 0-9.") {
          dispatch(setError("Дозволені символи для пароля a-z, A-Z, 0-9"));
        } else if (err.response.data.message.includes("already exists")) {
          dispatch(setError("Такий логін чи електронна адреса вже існує"));
        }
      }
      return Promise.reject(err);
    });
};

export default registrationUser;
