import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
// import { useSelector, useDispatch } from "react-redux";
// import { resetCart } from "../../../redux/actions/cartActions";
import CartItem from "./CartItem";
import { FormButton } from "../../button/Button";
import { NEW_CART_URL } from "../../../endpoints/endpoints";
import { resetCart } from "../../../redux/actions/cartActions";
import { deleteCart } from "../../../api/updateCart";
import styles from "./Cart.module.scss";
// import { openModal } from "../../../redux/actionsCreators/modalActionsCreators";

function LoginModal() {
  return (
    <div className={styles.loginModal}>
      Спершу авторизуйтесь
    </div>
  );
}


function Cart() {
  // const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const currentDate = new Date();
  const formattedDate = `${currentDate.getFullYear()}${(currentDate.getMonth() + 1).toString().padStart(2, "0")}${currentDate.getDate().toString().padStart(2, "0")}`;
  const orderNumber = `52-${formattedDate}`;
  const isCartEmpty = cartItems.length === 0;
  const dispatch = useDispatch();
  const isUserLoggedIn = localStorage.getItem("userLogin") || null;

  // window
  const [showLoginModal, setShowLoginModal] = useState(false);
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

  const handlePurchase = async () => {
    // dispatch(openModal());
    try {
      const cartData = await getCartFromServer();
      if (cartData !== null) {
        const { email, telephone, _id: customerId } = cartData.customerId;
        const newOrder = {
          customerId,
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

  // const handlePurchaseWithoutLogIn = () => console.log("!");

  return (
    <div className={styles.cardsSectionWrapper}>
      <h1 className={styles.cardsSectionHeadline}>Кошик</h1>
      <p className={styles.cardsSectionText}>Ваші замовлення</p>

      {isCartEmpty ? <p className={styles.cartEmpty}>Ваш кошик порожній</p>
        : (
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
        )}
      {/* {isCartEmpty ? null : <FormButton text="Оформити замовлення"
      padding="10px" onClick={isUserLoggedIn ? handlePurchase : handlePurchaseWithoutLogIn} />} */}
      <div className={!showLoginModal ? styles.cardItemIcons : styles.showLoginModal}>
        {isCartEmpty ? null : <FormButton text="Оформити замовлення" padding="10px" onClick={isUserLoggedIn ? handlePurchase : promptLogin} />}
      </div>
      { showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} /> }
    </div>
  );
}

export default Cart;
