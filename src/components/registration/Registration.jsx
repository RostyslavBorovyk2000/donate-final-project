import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, Field, ErrorMessage, Formik } from "formik"
import { object, string } from "yup"
import EyeClosed from "../routes/adminRoutes/adminLogin/eye/EyeClosed";
import EyeOpen from "../routes/adminRoutes/adminLogin/eye/EyeOpen";
import Info from "./icons/Info";
import styles from "./Registration.module.scss"


function Registration({ headline, to }){
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const [showError, setShowError] = useState(false);
  // const [showError, setShowError] = useState("");
  const navigate = useNavigate();

  const validationSchema = object().shape({
    firstName: string()
      .required("Поле логіну є обов'язковим для заповнення")
      .matches(/[a-zA-Zа-яА-ЯіІїЇ'єЄ]/, "Дозволені символи для ім'я a-z, A-Z, а-я, А-Я")
      .min(2, "Ім'я має містити від 2 до 25 символів")
      .max(25, "Ім'я має містити від 2 до 25 символів"),
    lastName: string()
      .required("Поле логіну є обов'язковим для заповнення")
      .matches(/[a-zA-Zа-яА-ЯіІїЇ'єЄ]/, "Дозволені символи для прізвища a-z, A-Z, а-я, А-Я")
      .min(2, "Прізвище має містити від 2 до 25 символів")
      .max(25, "Прізвище має містити від 2 до 25 символів"),
    login: string()
      .required("Поле логіну є обов'язковим для заповнення")
      .min(6, "Логін повинен мати не менше 6 символів")
      .max(16, "Логін повинен мати не більше 16 символів"),
    email: string()
      .email("Некорректний формат електронної адреси")
      .required("Поле логіну є обов'язковим для заповнення"),
    password: string()
      .required("Поле пароля є обов'язковим для заповнення")
      .min(7, "Пароль має містити від 7 до 30 символів")
      .max(30, "Пароль має містити від 7 до 30 символів")
      .matches(/[a-zA-Z0-9]/, "Дозволені символи для пароля: a-z, A-Z, 0-9"),
    telephone: string()
      .matches(/\+380\d{3}\d{2}\d{2}\d{2}/, "Некорректний формат телефонного номера")
  })

  const sendData = (firstName, lastName, login, email, password, telephone, birthdate) => {
    const userData = {
      firstName: firstName,
      lastName: lastName,
      login: login,
      email: email,
      password: password,
      isAdmin: true,
      telephone: telephone,
      birthdate: birthdate
    };

  axios
    .post("http://localhost:4000/api/customers", userData)
    .then(loginResult => {
      console.log(loginResult);
      if(loginResult.status === 200) {
        navigate({to});
        // const token = loginResult.data.token;
      }
    })
    .catch(err => {
      // ! add the way for another errors
      console.log(err);
      if (err.response.data.message.includes("already exists") || err.response.data.password === "Allowed characters for password is a-z, A-Z, 0-9.") {
        console.log(err.response.data.message);
        console.log(err.response.data.password);
        setShowError(true);
      }
    });
  }


  return(
    <section className={styles.windowWrapper}>
      <div className={styles.window}>
        <h1>{headline}</h1>

        <Formik 
          initialValues={{
            firstName: "",
            lastName: "",
            login: "",
            email: "",
            password: "",
            telephone: "",
            birthdate: ""
          }}
          onSubmit={(values, { setSubmitting }) => {
            sendData(values.firstName, values.lastName, values.login, values.email, values.password, values.telephone, values.birthdate);
            setSubmitting(false);
          }}
          validationSchema={validationSchema}
        >

          {({ isSubmitting }) => (
            <Form className={styles.form}>

              <Field name="firstName">
                {({ field, meta }) => (
                  <label htmlFor="firstName" className={styles.label}>
                    <div className={styles.labelTextWrapper}>
                      <div className={styles.iconWrapper}>
                        <p className={styles.infoText}>Обов'язково</p>
                        <Info/>
                      </div>
                      <p className={styles.labelText}>Ім'я:</p>
                    </div>
                    <input
                      {...field}
                      id="firstName"
                      className={ meta.touched && meta.error ? styles.inputAttention : styles.input }
                    />
                  </label> 
                )}
              </Field>
              <Field name="lastName">
                {({ field, meta }) => (
                  <label htmlFor="lastName" className={styles.label}>
                    <div className={styles.labelTextWrapper}>
                      <div className={styles.iconWrapper}>
                        <p className={styles.infoText}>Обов'язково</p>
                        <Info/>
                      </div>
                      <p className={styles.labelText}>Прізвище:</p>
                    </div>
                    <input
                      {...field}
                      id="lastName"
                      className={ meta.touched && meta.error ? styles.inputAttention : styles.input }
                    />
                  </label> 
                )}
              </Field>
              <Field name="login">
                {({ field, meta }) => (
                  <label htmlFor="login" className={styles.label}>
                    <div className={styles.labelTextWrapper}>
                      <div className={styles.iconWrapper}>
                        <p className={styles.infoText}>Обов'язково</p>
                        <Info/>
                      </div>
                      <p className={styles.labelText}>Логін:</p>
                    </div>
                    <input
                      {...field}
                      id="login"
                      className={ meta.touched && meta.error ? styles.inputAttention : styles.input }
                    />
                  </label> 
                )}
              </Field>
              <Field name="email">
                {({ field, meta }) => (
                  <label htmlFor="email" className={styles.label}>
                    <div className={styles.labelTextWrapper}>
                      <div className={styles.iconWrapper}>
                        <p className={styles.infoText}>Обов'язково</p>
                        <Info/>
                      </div>
                      <p className={styles.labelText}>Email:</p>
                    </div>
                    <input
                      {...field}
                      type="email"
                      id="email"
                      className={ meta.touched && meta.error ? styles.inputAttention : styles.input }
                    />
                   </label> 
                )}
              </Field>
              <Field name="password">
                {({ field, meta }) => (
                  <label htmlFor="password" className={`${styles.passwordWrapper} ${styles.label}`}>
                    <div className={styles.labelTextWrapper}>
                      <div className={styles.iconWrapper}>
                        <p className={styles.infoText}>Обов'язково</p>
                        <Info/>
                      </div>
                      <p className={styles.labelText}>Пароль:</p>
                    </div>
                    <input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      id="password"
                      className={ meta.touched && meta.error ? styles.inputAttention : styles.input }
                    />
                    <div
                      type="button"
                      onClick={togglePasswordVisibility}
                      className={styles.iconButton}
                    >
                      {showPassword === false ? <EyeClosed /> : <EyeOpen />}
                    </div>
                  </label>
                )}
              </Field>
              <Field name="telephone">
                {({ field, meta }) => (
                  <label htmlFor="tel" className={styles.label}>
                    <div className={styles.labelTextWrapper}>
                      <div className={styles.iconWrapper}>
                        <p className={styles.infoText}>+38...</p>
                        <Info/>
                      </div>
                      <p className={styles.labelText}>Телефон:</p>
                    </div>
                    <input
                      {...field}
                      type="tel"
                      id="tel"
                      className={ meta.touched && meta.error ? styles.inputAttention : styles.input }
                    />
                  </label>
                )}
              </Field>
              <Field name="birthdate">
                {({ field, meta }) => (
                  <label htmlFor="date" className={styles.label}>Дата народження:
                    <input
                      {...field}
                      type="date"
                      id="date"
                      className={ meta.touched && meta.error ? styles.inputAttention : styles.input }
                    />
                  </label>
                )}
              </Field>

              <button
                type="submit"
                className={styles.buttonStyle}
                disabled={isSubmitting}>
                Зареєструватися
              </button>
              <div className={styles.errorsWrapper}>
                {showError ? <p className={showError && styles.textAttention}>Такий логін чи пароль вже існує</p> : null}
                <ErrorMessage name="firstName" component="p" className={styles.textAttention}/>
                <ErrorMessage name="lastName" component="p" className={styles.textAttention}/>
                <ErrorMessage name="login" component="p" className={styles.textAttention}/>
                <ErrorMessage name="email" component="p" className={styles.textAttention}/>
                <ErrorMessage name="password" component="p" className={styles.textAttention}/>
                <ErrorMessage name="telephone" component="p" className={styles.textAttention}/>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  )
}

export default Registration