import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import DocumentTitle from "../../DocumentTitle";
import Heart from "./Heart";
import Cart from "./Cart";
import OrderList from "./OrderList";
import { GET_CUSTOMER } from "../../../endpoints/endpoints";
import { setAuthToken } from "../../../redux/actions/authActions";
import styles from "./CustomerPage.module.scss";


function CustomerPage() {
  const [customer, setCustomer] = useState([]);
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


  return (
    <>
      <DocumentTitle title="Кабінет" />
      <section className={styles.wrapper}>
        <h1 className={styles.headline}>Особистий кабінет</h1>
        <div className={styles.dataWrapper}>
          <div className={styles.customerDataWrapper}>
            <h3>Користувач</h3>
            <div className={styles.customerData}>
              <div className={styles.name}>
                Ім&apos;я:
                <p>
                  {customer.firstName}
                  &nbsp;
                  {customer.lastName}
                </p>
              </div>
              <div className={styles.name}>
                Логін:
                <p>
                  {customer.login}
                </p>
              </div>
              <div className={styles.name}>
                Телефон:
                <p>
                  {customer.telephone}
                </p>
              </div>
              <div className={styles.name}>
                email:
                <p>
                  {customer.email}
                </p>
              </div>
            </div>
          </div>
          <div className={styles.iconsSectionWrapper}>
            <div className={styles.cartProductsWrapper}>
              <div className={styles.cartDataWrapper}>
                <h2 className={styles.cartProductsHeadline}>Позиції в кошику:</h2>
                <div className={styles.iconSection}>
                  <Cart />
                  <p>{productsCartNumber}</p>
                </div>
              </div>
              <div className={styles.routesLinkWrapper}>
                <Link className={styles.routesLink} to="/cart">Перейти до кошика</Link>
              </div>
            </div>
            <div className={styles.favoritesWrapper}>
              <div className={styles.cartDataWrapper}>
                <h2 className={styles.favoritesHeadline}>Обрані позиції:</h2>
                <div className={styles.iconSection}>
                  <Heart />
                  <p>{productsFavoritesNumber}</p>
                </div>
              </div>
              <div className={styles.routesLinkWrapper}>
                <Link className={styles.routesLink} to="/favorites">Перейти до обраних</Link>
              </div>
            </div>
          </div>
        </div>

        <OrderList />
        
      </section>
    </>
  );
}

export default CustomerPage;
