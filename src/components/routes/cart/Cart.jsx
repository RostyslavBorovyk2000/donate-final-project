import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  Form, Field, ErrorMessage, Formik,
} from "formik";
import { object, string } from "yup";
import CartItem from "./CartItem";
import { FormButton } from "../../button/Button";
import { NEW_CART_URL, GET_CUSTOMER } from "../../../endpoints/endpoints";
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
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showLoginModalPurchase, setShowLoginModalPurchase] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [customerFirstName, setCustomerFirstName] = useState("");
  const [customerLastName, setCustomerLastName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerNameInput, setCustomerNameInput] = useState(false);
  const [customerPhoneInput, setCustomerPhoneInput] = useState(false);
  const [nameFieldValue, setNameFieldValue] = useState("");
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

  // const handleChange = (event) => {
  //   setSelectedOption(event.target.value);
  // };
  const handleChange = (event) => {
    setSelectedOption(event.target.value);
    if (event.target.id === "name") {
      setNameFieldValue(event.target.value);
    }
  };

  const handleChangeCustomerName = () => {
    setCustomerNameInput(true);
  };

  const handleChangeCustomerPhone = () => {
    setCustomerPhoneInput(true);
  };

  async function getCartFromServer() {
    try {
      const response = await axios.get(NEW_CART_URL);
      return response.data;
    } catch (err) {
      console.error("Помилка при отриманні даних:", err);
      return null;
    }
  }

  const showForm = async () => {
    setOpenForm(true);
    const customerData = await getCustomerFromServer();
    const { firstName, lastName, telephone } = customerData;
    setCustomerFirstName(firstName);
    setCustomerLastName(lastName);
    setCustomerPhone(telephone);
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

  async function getCustomerFromServer() {
    try {
      const response = await axios.get(GET_CUSTOMER);
      return response.data;
    } catch (err) {
      console.error("Помилка при отриманні даних:", err);
      return null;
    }
  }

  
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
      <div className={openForm && !isCartEmpty ? styles.formSectionWrapper : styles.hidden}>
        <div className={styles.formWrapper}>
          <h1 className={styles.headline}>Оформлення замовлення</h1>
          <p className={`${styles.text} ${styles.headlineText}`}>Заповніть форму</p>
          <p className={`${styles.textForm}`}>Ваші контактні дані</p>
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
                <div className={styles.dataCustomerWrapper}>
                  <div className={styles.nameCustomer}>
                    <p className={customerNameInput ? styles.hidden : null}>{`Повне ім'я: ${customerLastName} ${customerFirstName}`}</p>
                    <div className={!customerNameInput ? styles.hidden : null}>
                      {/* <Field name="name">
                        {({ field, meta }) => (
                          <input
                            {...field}
                            id="name"
                            // eslint-disable-next-line max-len
                            className={meta.touched && meta.error ?
                              styles.inputAttention : styles.input}
                            placeholder="Ім'я та Прізвище"
                          />
                        )}
                      </Field> */}
                      <Field name="name">
                        {({ field, meta }) => (
                          <input
                            {...field}
                            id="name"
                            // eslint-disable-next-line max-len
                            className={meta.touched && meta.error ? styles.inputAttention : styles.input}
                            placeholder="Ім'я та Прізвище"
                            onChange={handleChange}
                          />
                        )}
                      </Field>
                    </div>
                    {/* eslint-disable-next-line max-len */}
                    <button
                      type="button"
                      className={customerNameInput ? styles.hidden : styles.customerFirstNameChange}
                      onClick={handleChangeCustomerName}
                    >
                      Змінити
                    </button>
                  </div>
                  <div className={styles.nameCustomer}>
                    <p className={customerPhoneInput ? styles.hidden : null}>{customerPhone}</p>
                    <div className={!customerPhoneInput ? styles.hidden : null}>
                      <Field name="phone">
                        {({ field, meta }) => (
                          <input
                            {...field}
                            id="phone"
                            // eslint-disable-next-line max-len
                            className={meta.touched && meta.error ? styles.inputAttention : styles.input}
                            placeholder="Телефон"
                          />
                        )}
                      </Field>
                    </div>
                    {/* eslint-disable-next-line max-len */}
                    <button
                      type="button"
                      // eslint-disable-next-line max-len
                      className={customerPhoneInput ? styles.hidden : styles.customerFirstNameChange}
                      onClick={handleChangeCustomerPhone}
                    >
                      Змінити
                    </button>
                  </div>
                </div>

                <p className={`${styles.textForm}`}>Дані для доставлення</p>
                <div className={styles.deliverySection}>
                  <div>
                    <input
                      type="radio"
                      id="shop"
                      value="shop"
                      checked={selectedOption === "shop"}
                      onChange={handleChange}
                    />
                    {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                    <label htmlFor="shop" className={styles.text}>Самовивіз з магазину</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="courier"
                      value="courier"
                      checked={selectedOption === "courier"}
                      onChange={handleChange}
                    />
                    {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                    <label htmlFor="courier" className={styles.text}>Кур&apos;єр на зазначену адресу</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="np"
                      value="np"
                      checked={selectedOption === "np"}
                      onChange={handleChange}
                    />
                    {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                    <label htmlFor="option3" className={styles.text}>Самовивіз з Нової Пошти</label>
                  </div>
                </div>
                <div>
                  {selectedOption === "shop" && <div className={styles.shopAdres}>Адреса магазину: м. Київ, вул. Незалежность 11 а</div>}
                  {selectedOption === "courier" && (
                    <div>
                      <Field name="region">
                        {({ field, meta }) => (
                          <input
                            {...field}
                            id="region"
                            // eslint-disable-next-line max-len
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
                            // eslint-disable-next-line max-len
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
                            // eslint-disable-next-line max-len
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
                            // eslint-disable-next-line max-len
                            className={meta.touched && meta.error ? styles.inputAttention : styles.input}
                            placeholder="Поштовий індекс"
                          />
                        )}
                      </Field>
                    </div>
                  )}
                  {selectedOption === "np" && (
                    <Field name="addressNp">
                      {({ field, meta }) => (
                        <input
                          {...field}
                          id="addressNp"
                          // eslint-disable-next-line max-len
                          className={meta.touched && meta.error ? styles.inputAttention : styles.input}
                          placeholder="Місто та № відділення Нової Пошти"
                        />
                      )}
                    </Field>
                  )}
                </div>

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
        <div className={styles.checkOrderWrapper}>
          <h3 className={styles.headline}>Підсумок</h3>
          <p className={`${styles.text} ${styles.headlineText}`}>Перевірте інформацію</p>
          <div className={styles.checkOrderInfo}>
            <p>{nameFieldValue === "" ? customerLastName : nameFieldValue}</p>
            <p>{nameFieldValue === "" ? customerFirstName : null}</p>
          </div>
        </div>
      </div>
      { showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} /> }
    </div>
  );
}

export default Cart;
