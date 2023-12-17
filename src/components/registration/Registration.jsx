/* eslint-disable max-len */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Form, Field, ErrorMessage, Formik,
} from "formik";
import { object, string } from "yup";
import PropTypes from "prop-types";
import EyeClosed from "../logIn/eye/EyeClosed";
import EyeOpen from "../logIn/eye/EyeOpen";
import { FormButton } from "../button/Button";
import registrationUser from "../../api/registrationUser";
import styles from "./Registration.module.scss";


function Registration({ headline, to, isAdmin }) {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const [showError, setShowError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validationSchema = object().shape({
    firstName: string()
      .required("Поле імені є обов'язковим для заповнення")
      .matches(/[a-zA-Zа-яА-ЯіІїЇ'єЄ]/, "Дозволені символи для ім'я a-z, A-Z, а-я, А-Я")
      .min(2, "Ім'я має містити від 2 до 25 символів")
      .max(25, "Ім'я має містити від 2 до 25 символів"),
    lastName: string()
      .required("Поле прізвища є обов'язковим для заповнення")
      .matches(/[a-zA-Zа-яА-ЯіІїЇ'єЄ]/, "Дозволені символи для прізвища a-z, A-Z, а-я, А-Я")
      .min(2, "Прізвище має містити від 2 до 25 символів")
      .max(25, "Прізвище має містити від 2 до 25 символів"),
    login: string()
      .required("Поле логіну є обов'язковим для заповнення")
      .matches(/[a-zA-Zа-яА-Я]/, "Дозволені символи для логіна a-z, A-Z, 0-9")
      .min(6, "Логін повинен мати не менше 6 символів")
      .max(10, "Логін повинен мати не більше 10 символів"),
    email: string()
      .email("Некорректний формат електронної адреси")
      .required("Поле адреси електронної пошти є обов'язковим для заповнення"),
    password: string()
      .required("Поле пароля є обов'язковим для заповнення")
      .min(7, "Пароль має містити від 7 до 30 символів")
      .max(30, "Пароль має містити від 7 до 30 символів")
      .matches(/[a-zA-Z0-9]/, "Дозволені символи для пароля: a-z, A-Z, 0-9"),
    telephone: string()
      .matches(/\+380\d{3}\d{2}\d{2}\d{2}/, "Некорректний формат телефонного номера (має починатися з +380...)"),
  });

  const handleUserRegistration = (
    firstName,
    lastName,
    login,
    email,
    password,
    telephone,
  ) => {
    dispatch(registrationUser(
      firstName,
      lastName,
      login,
      email,
      password,
      telephone,
      isAdmin,
    ))
      .then(() => {
        navigate(to);
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          if (error.response.data.login === "Login must be between 3 and 10 characters") {
            setShowError("Логін має містити від 3 до 10 символів");
          } else if (error.response.data.login === "Allowed characters for login is a-z, A-Z, 0-9.") {
            setShowError("Дозволені символи для логіна a-z, A-Z, 0-9");
          } else if (error.response.data.password === "Allowed characters for password is a-z, A-Z, 0-9.") {
            setShowError("Allowed characters for password is a-z, A-Z, 0-9.");
          } else if (error.response.data.message.includes("already exists")) {
            setShowError("Такий логін чи електронна адреса вже існує");
          }
        }
      });
  };


  return (
    <section className={styles.windowWrapper}>
      <div className={styles.window}>
        <h1 className={styles.headline}>{headline}</h1>
        <p className={`${styles.text} ${styles.headlineText}`}>Введіть дані для реєстрації</p>

        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            login: "",
            email: "",
            password: "",
            telephone: "",
          }}
          onSubmit={(values, { setSubmitting }) => {
            // eslint-disable-next-line max-len
            handleUserRegistration(values.firstName, values.lastName, values.login, values.email, values.password, values.telephone);
            setSubmitting(false);
          }}
          validationSchema={validationSchema}
        >

          {({ isSubmitting }) => (
            <Form className={styles.form}>

              <Field name="firstName">
                {({ field, meta }) => (
                  <input
                    {...field}
                    id="firstName"
                    className={meta.touched && meta.error ? styles.inputAttention : styles.input}
                    placeholder="Ім'я"
                  />
                )}
              </Field>
              <Field name="lastName">
                {({ field, meta }) => (
                  <input
                    {...field}
                    id="lastName"
                    className={meta.touched && meta.error ? styles.inputAttention : styles.input}
                    placeholder="Прізвище"
                  />
                )}
              </Field>
              <Field name="login">
                {({ field, meta }) => (
                  <input
                    {...field}
                    id="login"
                    className={meta.touched && meta.error ? styles.inputAttention : styles.input}
                    placeholder="Логін"
                  />
                )}
              </Field>
              <Field name="email">
                {({ field, meta }) => (
                  <input
                    {...field}
                    type="email"
                    id="email"
                    className={meta.touched && meta.error ? styles.inputAttention : styles.input}
                    placeholder="Email"
                  />
                )}
              </Field>
              <Field name="password">
                {({ field, meta }) => (
                  <div htmlFor="password" className={`${styles.passwordWrapper} ${styles.label}`}>
                    <input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      id="password"
                      className={meta.touched && meta.error ? styles.inputAttention : styles.input}
                      placeholder="Пароль"
                    />
                    <div
                      type="button"
                      onClick={togglePasswordVisibility}
                      className={styles.iconButton}
                    >
                      {showPassword === false ? <EyeClosed /> : <EyeOpen />}
                    </div>
                  </div>
                )}
              </Field>
              <Field name="telephone">
                {({ field, meta }) => (
                  <input
                    {...field}
                    type="tel"
                    id="tel"
                    className={meta.touched && meta.error ? styles.inputAttention : styles.input}
                    placeholder="Телефон"
                  />
                )}
              </Field>

              <FormButton
                type="submit"
                className={styles.buttonStyle}
                disabled={isSubmitting}
                text="Зареєструватися"
                width="300px"
              />
              <div className={styles.errorsWrapper}>
                {showError ? <p className={showError && styles.textAttention}>{showError}</p> : null}
                <ErrorMessage name="firstName" component="p" className={styles.textAttention} />
                <ErrorMessage name="lastName" component="p" className={styles.textAttention} />
                <ErrorMessage name="login" component="p" className={styles.textAttention} />
                <ErrorMessage name="email" component="p" className={styles.textAttention} />
                <ErrorMessage name="password" component="p" className={styles.textAttention} />
                <ErrorMessage name="telephone" component="p" className={styles.textAttention} />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
}


Registration.propTypes = {
  headline: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  isAdmin: PropTypes.bool.isRequired,
};

export default Registration;
