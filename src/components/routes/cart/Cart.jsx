import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  Form, Field, ErrorMessage, Formik,
} from "formik";
import { object, string } from "yup";
import CartItem from "./CartItem";
import { FormButton } from "../../button/Button";
import { NEW_CART_URL } from "../../../endpoints/endpoints";
import { resetCart } from "../../../redux/actions/cartActions";
import { deleteCart } from "../../../api/updateCart";
import styles from "./Cart.module.scss";


function LoginModal() {
  return (
    <div className={styles.loginModal}>
      Спершу авторизуйтесь
    </div>
  );
}

function LoginModalPurchase() {
  return (
    <div className={styles.loginModalPurchase}>
      Покупка оформлена!
    </div>
  );
}


function Cart() {
  const cartItems = useSelector((state) => state.cart.items);
  const currentDate = new Date();
  const formattedDate = `${currentDate.getFullYear()}${(currentDate.getMonth() + 1).toString().padStart(2, "0")}${currentDate.getDate().toString().padStart(2, "0")}`;
  const orderNumber = `52-${formattedDate}`;
  const isCartEmpty = cartItems.length === 0;
  const dispatch = useDispatch();
  const isUserLoggedIn = localStorage.getItem("userLogin") || null;
  const [openForm, setOpenForm] = useState(false);

  // window
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showLoginModalPurchase, setShowLoginModalPurchase] = useState(false);
  const timerRef = useRef();
  function promptLogin() {
    setShowLoginModal(true);
    timerRef.current = setTimeout(() => {
      setShowLoginModal(false);
    }, 2000);
  }
  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  }, []);

  function promptPurchase() {
    setShowLoginModalPurchase(true);
    timerRef.current = setTimeout(() => {
      setShowLoginModalPurchase(false);
    }, 2000);
  }
  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  }, []);

  // ! api
  async function getCartFromServer() {
    try {
      const response = await axios.get(NEW_CART_URL);
      return response.data;
    } catch (err) {
      console.error("Помилка при отриманні даних:", err);
      return null;
    }
  }

  const showForm = () => {
    setOpenForm(true);
  };

  const handlePurchase = async (region, city, address, postal) => {
    try {
      const cartData = await getCartFromServer();
      if (cartData !== null) {
        const { email, telephone, _id: customerId } = cartData.customerId;
        const newOrder = {
          customerId,
          deliveryAddress: {
            region,
            city,
            address,
            postal,
          },
          canceled: false,
          email,
          mobile: telephone,
          letterSubject: "Дякуємо за покупку та весок на підтримку ЗСУ!",
          letterHtml: `<h1>Ваше замовлення прийнято. Номер замовлення - ${orderNumber}.</h1><p>Ми переможемо!</p>`,
        };

        axios
          .post("http://localhost:4000/api/orders", newOrder)
          .then((response) => {
            if (response.status === 200) {
              localStorage.setItem("Cart", JSON.stringify([]));
              dispatch(resetCart());
              deleteCart();
              setOpenForm(false);
              promptPurchase();
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } catch (error) {
      // !
      // setShowError(true);
      console.error("Помилка при вході:", error);
    }
  };

  const validationSchema = object().shape({
    region: string()
      .required("Поле області адреси доставлення є обов'язковим для заповнення")
      .matches(/[a-zA-Zа-яА-ЯіІїЇ'єЄ]/, "Дозволені символи для ім'я a-z, A-Z, а-я, А-Я"),
    city: string()
      .required("Поле населеного пункту є обов'язковим для заповнення")
      .matches(/[a-zA-Zа-яА-ЯіІїЇ'єЄ]/, "Дозволені символи для прізвища a-z, A-Z, а-я, А-Я"),
    address: string()
      .required("Поле адреси є обов'язковим для заповнення")
      .matches(/[a-zA-Zа-яА-ЯіІїЇ'єЄ]/, "Дозволені символи для прізвища a-z, A-Z, а-я, А-Я"),
    postal: string()
      .required("Поле поштового індекса є обов'язковим для заповнення")
      .matches(/[0-9]/, "Дозволені символи для пароля: 0-9"),
  });

  return (
    <div className={styles.cardsSectionWrapper}>
      <h1 className={styles.cardsSectionHeadline}>Кошик</h1>
      <p className={styles.cardsSectionText}>Ваші замовлення</p>
      {/* eslint-disable-next-line max-len */}
      { showLoginModalPurchase && <LoginModalPurchase onClose={() => setShowLoginModalPurchase(false)} /> }
      {/* eslint-disable-next-line max-len */}
      {isCartEmpty ? <p className={!showLoginModalPurchase ? styles.cartEmpty : styles.hidden}>Ваш кошик порожній</p>
        : (
          <>
            <table className={styles.cardsListWrapper}>
              <thead>
                <tr className={styles.tableRow}>
                  <th>Продукти</th>
                  <th>Ціна</th>
                  <th>Кількість</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  // eslint-disable-next-line no-underscore-dangle
                  <CartItem key={item._id} item={item} />
                ))}
              </tbody>
            </table>
            <FormButton
              text="Оформити замовлення"
              padding="10px"
              onClick={showForm}
              className={openForm ? styles.hidden : styles.buttonStyle}
            />
          </>
        )}
      <div className={openForm && !isCartEmpty ? styles.formWrapper : styles.hidden}>
        {/* isCartEmpty ? styles.hidden :  */}
        <h1 className={styles.headline}>Замовлення</h1>
        <p className={`${styles.text} ${styles.headlineText}`}> Заповніть форму замовлення</p>
        <Formik
          initialValues={{
            region: "",
            city: "",
            address: "",
            postal: "",
          }}
          onSubmit={(values, { setSubmitting }) => {
            handlePurchase(values.region, values.city, values.address, values.postal);
            setSubmitting(false);
          }}
          validationSchema={validationSchema}
        >

          {({ isSubmitting }) => (
            <Form className={styles.form}>

              <Field name="region">
                {({ field, meta }) => (
                  <input
                    {...field}
                    id="region"
                    className={meta.touched && meta.error ? styles.inputAttention : styles.input}
                    placeholder="Область"
                  />
                )}
              </Field>
              <Field name="city">
                {({ field, meta }) => (
                  <input
                    {...field}
                    id="city"
                    className={meta.touched && meta.error ? styles.inputAttention : styles.input}
                    placeholder="Населений пункт"
                  />
                )}
              </Field>
              <Field name="address">
                {({ field, meta }) => (
                  <input
                    {...field}
                    id="address"
                    className={meta.touched && meta.error ? styles.inputAttention : styles.input}
                    placeholder="Адреса (вулиця, будинок, квартира)"
                  />
                )}
              </Field>
              <Field name="postal">
                {({ field, meta }) => (
                  <input
                    {...field}
                    id="postal"
                    className={meta.touched && meta.error ? styles.inputAttention : styles.input}
                    placeholder="Поштовий індекс"
                  />
                )}
              </Field>

              <div className={styles.errorsWrapper}>
                <ErrorMessage name="region" component="p" className={styles.textAttention} />
                <ErrorMessage name="city" component="p" className={styles.textAttention} />
                <ErrorMessage name="address" component="p" className={styles.textAttention} />
                <ErrorMessage name="postal" component="p" className={styles.textAttention} />
              </div>

              <FormButton
                type="submit"
                disabled={isSubmitting}
                text="Придбати"
                padding="10px"
                onClick={isUserLoggedIn ? handlePurchase : promptLogin}
              />
            </Form>
          )}
        </Formik>
      </div>
      {/* <div className={!showLoginModal ? styles.cardItemIcons : styles.showLoginModal}> */}
      {/* eslint-disable-next-line max-len */}
      {/* {isCartEmpty ? null : <FormButton text="Оформити замовлення" padding="10px" onClick={isUserLoggedIn ? handlePurchase : promptLogin} />}
      </div> */}
      { showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} /> }
    </div>
  );
}

export default Cart;
