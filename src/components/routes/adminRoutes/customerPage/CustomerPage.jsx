import { useSelector, useDispatch } from "react-redux";
// import { initializeFavorites } from "../../../redux/actions/cartActions";
import { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import DocumentTitle from "../../DocumentTitle";
// import CustPageProdList from "./CustPageProdList";
import Heart from "./Heart";
import Cart from "./Cart";
import { MAKE_ORDERS, GET_CUSTOMER } from "../../../../endpoints/endpoints";
import { setAuthToken } from "../../../../redux/actions/authActions";
import styles from "./CustomerPage.module.scss";


function CustomerPage() {
  const [customer, setCustomer] = useState([]);
  const [orders, setOrders] = useState([]);
  const productsCartNumber = useSelector((state) => state.cart.itemCount);
  const productsFavoritesNumber = useSelector((state) => state.favorites.itemCount);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    
    if (token) {
      dispatch(setAuthToken(token));
      getCustomerFromServer();
    }
    async function getCustomerFromServer() {
      try {
        const response = await axios.get(GET_CUSTOMER);
        setCustomer(response.data);
      } catch (err) {
        console.error("Помилка при отриманні даних:", err);
      }
    }
  }, [dispatch]);

  const getOrders = async () => {
    try {
      const response = await axios.get(MAKE_ORDERS);
      return response.data;
    } catch (err) {
      console.error("Помилка при отриманні даних:", err);
      throw err;
    }
  };

  async function getOrdersList() {
    const customerOrders = await getOrders();
    setOrders(customerOrders);
  }


  return (
    <>
      <DocumentTitle title="Кабінет" />
      <section className={styles.wrapper}>
        <h1 className={styles.headline}>Особистий кабінет</h1>
        <div className={styles.dataWrapper}>
          <div className={styles.customerDataWrapper}>
            <h3>Дані про користувача</h3>
            <div className={styles.customerData}>
              <div className={styles.name}>
                Ім&apos;я:
                <p>
                  {customer.firstName}
                  &nbsp;
                  {customer.firstName}
                </p>
              </div>
              <div className={styles.name}>
                Логін:
                <p>
                  {customer.login}
                </p>
              </div>
              <div className={styles.telephone}>
                Телефон:
                <p>
                  {customer.telephone}
                </p>
              </div>
              <div className={styles.email}>
                email:
                <p>
                  {customer.email}
                </p>
              </div>
            </div>
          </div>
          <div className={styles.cartProductsWrapper}>
            <div className={styles.cartDataWrapper}>
              <h2 className={styles.cartProductsHeadline}>Позиції в кошику:</h2>
              <Cart />
              <p>{productsCartNumber}</p>
            </div>
            <div className={styles.routesLinkWrapper}>
              <Link className={styles.routesLink} to="/cart">Перейти до кошика</Link>
            </div>
          </div>
          <div className={styles.favoritesWrapper}>
            <div className={styles.cartDataWrapper}>
              <h2 className={styles.favoritesHeadline}>Обрані позиції:</h2>
              <Heart />
              <p>{productsFavoritesNumber}</p>
            </div>
            <div className={styles.routesLinkWrapper}>
              <Link className={styles.routesLink} to="/favorites">Перейти до обраних</Link>
            </div>
          </div>
        </div>
        <div className={styles.ordersWrapper}>
          <h2>Попередні покупки</h2>
          <div className={styles.ordersList}>
            {orders.map((item) => (
              // <CartItem key={item._id} item={item} />
              <>
                <p>{item.orderNo}</p>
                <p>{item.date}</p>
                <div>
                  {item.products.map((i) => (
                    <>
                      <p>{i.product.name}</p>
                      <p>{i.product.currentPrice}</p>
                    </>
                  ))}
                </div>
              </>
            ))}
          </div>
          <button type="button" onClick={getOrdersList}>Переглянути</button>
          <button type="button">Закрити</button>
        </div>
      </section>
    </>
  );
}

export default CustomerPage;
