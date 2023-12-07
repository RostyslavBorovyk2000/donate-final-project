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
  const [showLoginModalPurchase, setShowLoginModalPurchase] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const timerRef = useRef();

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

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
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
  };

  const handlePurchase = async (name = "", phone = "", email = "", region = "", city = "", address = "", postal = "", addressNp = "") => {
    if (isUserLoggedIn !== null) {
      try {
        const cartData = await getCartFromServer();
        // const lsData = localStorage.getItem("cart") || null;
        if (cartData !== null) {
          const { _id: customerId } = cartData.customerId;
          const newOrder = {
            customerId,
            deliveryAddress: {
              region,
              city,
              address,
              postal,
              addressNp,
            },
            canceled: false,
            email,
            name,
            mobile: phone,
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
    } else {
      try {
        const cartData = JSON.parse(localStorage.getItem("Cart")) || null;
        if (cartData !== null) {
          const productsForOrder = cartData.map((item) => ({
            product: {
              category: item.category,
              date: item.date,
              enabled: item.enabled,
              itemNo: item.itemNo,
              name: item.name,
              // eslint-disable-next-line no-underscore-dangle
              _id: item._id,
              quantity: item.quantity,
              currentPrice: item.currentPrice,
            },
            cartQuantity: item.cartQuantity,
          }));
          const newOrder = {
            products: productsForOrder,
            deliveryAddress: {
              region,
              city,
              address,
              postal,
              addressNp,
            },
            canceled: false,
            name,
            email,
            mobile: phone,
            letterSubject: "Дякуємо за покупку та весок на підтримку ЗСУ!",
            letterHtml: `<h1>Ваше замовлення прийнято. Номер замовлення - ${orderNumber}.</h1><p>Ми переможемо!</p>`,
          };
  
          axios
            .post("http://localhost:4000/api/orders", newOrder)
            .then((response) => {
              if (response.status === 200) {
                localStorage.setItem("Cart", JSON.stringify([]));
                dispatch(resetCart());
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
    }
  };

  const validationSchema = object().shape({
    region: string()
      // .required("Поле області адреси доставлення є обов'язковим для заповнення")
      .matches(/[a-zA-Zа-яА-ЯіІїЇ'єЄ]/, "Дозволені символи для ім'я a-z, A-Z, а-я, А-Я"),
    city: string()
      // .required("Поле населеного пункту є обов'язковим для заповнення")
      .matches(/[a-zA-Zа-яА-ЯіІїЇ'єЄ]/, "Дозволені символи для прізвища a-z, A-Z, а-я, А-Я"),
    address: string()
      // .required("Поле адреси є обов'язковим для заповнення")
      .matches(/[a-zA-Zа-яА-ЯіІїЇ'єЄ]/, "Дозволені символи для прізвища a-z, A-Z, а-я, А-Я"),
    postal: string()
      // .required("Поле поштового індекса є обов'язковим для заповнення")
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
              // onClick={isUserLoggedIn ? showForm : promptLogin}
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
              name: "",
              phone: "",
              email: "",
              region: "",
              city: "",
              address: "",
              postal: "",
              addressNp: "",
            }}
            onSubmit={(values, { setSubmitting }) => {
              handlePurchase(
                values.name,
                values.phone,
                values.email,
                values.region,
                values.city,
                values.address,
                values.postal,
                values.addressNp,
              );
              setSubmitting(false);
            }}
            validationSchema={validationSchema}
          >

            {({ isSubmitting }) => (
              <Form className={styles.form}>
                <div className={styles.dataCustomerWrapper}>
                  <div className={styles.nameCustomer}>
                    <div>
                      <Field name="name">
                        {({ field, meta }) => (
                          <input
                            {...field}
                            id="name"
                            // eslint-disable-next-line max-len
                            className={meta.touched && meta.error ? styles.inputAttention : styles.input}
                            placeholder="Ім'я та Прізвище"
                            // onChange={handleNameChange}
                          />
                        )}
                      </Field>
                    </div>
                  </div>
                  <div className={styles.nameCustomer}>
                    <div>
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
                      <Field name="email">
                        {({ field, meta }) => (
                          <input
                            {...field}
                            id="email"
                            // eslint-disable-next-line max-len
                            className={meta.touched && meta.error ? styles.inputAttention : styles.input}
                            placeholder="email"
                          />
                        )}
                      </Field>
                    </div>
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
                <div className={styles.adressWrapper}>
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
                />
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default Cart;
