/* eslint-disable max-len */
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Form, Field, ErrorMessage, Formik,
} from "formik";
import { object, string } from "yup";
import { FormButton } from "../button/Button";
import subscribeUser from "../../api/subscribeUser";
import styles from "./Footer.module.scss";


export default function Subscribe() {
  const [showError, setShowError] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();

  const validationSchema = object().shape({
    email: string()
      .email("Некорректний формат електронної адреси"),
  });

  const handleUserSubscribe = (email) => {
    dispatch(subscribeUser(email))
      .then((response) => {
        if (response.status === 200) {
          setShowMessage(true);
          setTimeout(() => setShowMessage(false), 2000);
        }
      })
      .catch((error) => {
        setShowError(true);
        if (error.response.status === 400) {
          setErrorMessage("Така електронна адреса вже існує");
        }
        setTimeout(() => setShowError(false), 2000);
      });
  };
  


  return (
    <div className={styles.footerSubscribeWrapper}>
      <h3 className={styles.footerSubscribeHeader}>
        Дізнавайтесь про термінові збори, оновлення лотів та важливі новини!
      </h3>

      <Formik
        initialValues={{ email: "" }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          if (!values.email) {
            setShowError(true);
            setErrorMessage("Ви не ввели адресу");
            setTimeout(() => setShowError(false), 2000);
          } else {
            handleUserSubscribe(values.email);
            resetForm({ values: { email: "" } });
          }
          setSubmitting(false);
        }}
        validationSchema={validationSchema}
      >
        {({ isSubmitting }) => (

          <Form>
            <div className={styles.footerInput}>
              <Field
                type="email"
                name="email"
                placeholder="Введіть email"
                className={styles.emailInput}
              />
              <FormButton type="submit" className={styles.joinBtn} text="Підписатися" disabled={isSubmitting} />
            </div>
            <div className={styles.errorsWrapper}>
              {showMessage && <p className={styles.message}>Підписка оформлена</p>}
              <ErrorMessage name="email" component="p" />
              {showError && <p>{errorMessage}</p>}
            </div>
          </Form>

        )}
      </Formik>

      <p className={styles.footerSubscribeInfo}>
        Оформляйте підписку та отримуйте першими новини про оновлення в зборах та лотах аукціону доброчинності, акційні пропозиції та інформацію про нові поставки товару.
      </p>
    </div>
  );
}
