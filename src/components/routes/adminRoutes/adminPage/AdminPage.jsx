/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/jsx-indent */
/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
import React, { useEffect, useState } from "react";
import axios from "axios";
import DocumentTitle from "../../DocumentTitle";
import styles from "./AdminPage.module.scss";
import { SUBSCRIBE_URL, GET_PRODUCTS_URL } from "../../../../endpoints/endpoints";


function AdminPage() {
  const [subscribers, setSubscribers] = useState([]);
  const [products, setProducts] = useState([]);
  const [totalSubscribers, setTotalSubscribers] = useState(0);
  const [subscribersThisMonth, setSubscribersThisMonth] = useState(0);

  const [sectionVisibility, setSectionVisibility] = useState({
    products: false,
    subscribers: false,
    activeDonations: false,
    closeDonations: false,
    exceededDonations: false,
  });

  const toggleSectionVisibility = (section) => {
    setSectionVisibility((prevVisibility) => ({
      ...prevVisibility,
      [section]: !prevVisibility[section],
    }));
  };
  

  useEffect(() => {
    const getSubscribers = async () => {
      try {
        const response = await axios.get(SUBSCRIBE_URL);
        setSubscribers(response.data);
        setTotalSubscribers(response.data.length);
        const currentMonth = new Date().getMonth();
        // eslint-disable-next-line no-shadow
        const subscribersThisMonth = response.data.filter((subscriber) => {
          const subscriberMonth = new Date(subscriber.date).getMonth();
          return subscriberMonth === currentMonth;
        });

        setSubscribersThisMonth(subscribersThisMonth.length);
      } catch (error) {
        console.error("Error get subscribers:", error);
      }
    };

    const getProducts = async () => {
      try {
        const response = await axios.get(GET_PRODUCTS_URL);
        setProducts(response.data);
      } catch (error) {
        console.error("Error get products:", error);
      }
    };

    getSubscribers();
    getProducts();
  }, []);

  const activeDonations = products.filter((donation) => {
    const deadlineDate = new Date(donation.deadline);
    const currentDate = new Date();
    return deadlineDate > currentDate;
  });

  const closeDonations = products.filter((donation) => {
    const deadlineDate = new Date(donation.deadline);
    const currentDate = new Date();
    return deadlineDate < currentDate;
  });


  const exceededDonations = products.filter(
    (item) => item.category === "Благодійний лот" && item.currentValue > item.goal,
  );

  // const getAllProducts = products.length;

  const getAllProducts = products.filter(
    (product) => product.category === "Одяг",
  );

  const getAllHat = products.filter(
    (product) => product.subcategory === "Шапки" || product.subcategory === "Кепки",
  );

  const getAllShoes = products.filter(
    (product) => product.subcategory === "Взуття",
  );

  const getAllDress = products.filter(
    (product) => product.subcategory === "Одяг верхній",
  );

  const getAllFormSets = products.filter(
    (product) => product.subcategory === "Комплекти форми",
  );

  const getAllPants = products.filter(
    (product) => product.subcategory === "Штани",
  );

  const getAllHeatSink = products.filter(
    (product) => product.subcategory === "Термобілизна",
  );
  

  return (
    <>
      <DocumentTitle title="Кабінет адміністратора" />
      <section>
        <div>
          <h1 className={styles.adminSectionHeadline}>Кабінет адміністратора</h1>
        </div>
        <div className={styles.mainSection}>
        <div className={styles.sectionContainer}>
          <div className={styles.blockShowHide}>
          <h3 className={styles.titleContainer}>Товари:</h3>
<button className={styles.buttonShowHide} onClick={() => toggleSectionVisibility("products")}>
{sectionVisibility.products ? "Приховати" : "Показати"}
</button>
          </div>
          {sectionVisibility.products && (
          <ul className={styles.showList}>
            <div className={styles.showRow}>
            <p>Всього товарів:</p>
            <strong>{getAllProducts.length}</strong>
шт.
            </div>
            <p><u><strong>з них:</strong></u></p>
            <div className={styles.showRowSort}>
            <p>верхній одяг:</p>
            <strong>{getAllDress.length}</strong>
шт.
            </div>
            <div className={styles.showRowSort}>
            <p>комплекти форми:</p>
            <strong>{getAllFormSets.length}</strong>
шт.
            </div>
            <div className={styles.showRowSort}>
            <p>штани:</p>
            <strong>{getAllPants.length}</strong>
шт.
            </div>
            <div className={styles.showRowSort}>
            <p>термобілизна:</p>
            <strong>{getAllHeatSink.length}</strong>
шт.
            </div>
            <div className={styles.showRowSort}>
            <p>головних уборів:</p>
            <strong>{getAllHat.length}</strong>
шт.
            </div>
            <div className={styles.showRowSort}>
            <p>взуття:</p>
            <strong>{getAllShoes.length}</strong>
шт.
            </div>
          </ul>
          )}
        </div>
        <div className={styles.sectionContainer}>
        <div className={styles.blockShowHide}>
          <h3 className={styles.titleContainer}>Підписники:</h3>
          <button className={styles.buttonShowHide} onClick={() => toggleSectionVisibility("subscribers")}>
{sectionVisibility.subscribers ? "Приховати" : "Показати"}
          </button>
        </div>
          {sectionVisibility.subscribers && (
          <div className={styles.emailQuantity}>
<p>
                Всього:
                {" "}
                <strong>
                  {totalSubscribers}
                </strong>
                {" "}
                підписників.
</p>
          
<p>
                  За поточний місяць:
                  {" "}
                  <strong>
                    {subscribersThisMonth}
                  </strong>
                  {" "}
                  підписників.
</p>
          </div>
          )}
        </div>
        

        <div className={styles.sectionContainer}>
        <div className={styles.blockShowHide}>
          <h3 className={styles.titleContainer}>Донати, на які ще не завершився дедлайн:</h3>
          <button className={styles.buttonShowHide} onClick={() => toggleSectionVisibility("activeDonations")}>
{sectionVisibility.activeDonations ? "Приховати" : "Показати"}
          </button>
        </div>
          {sectionVisibility.activeDonations && (
          <ul className={styles.showList}>
            {activeDonations.map((donation) => (
              // eslint-disable-next-line no-underscore-dangle
              <li className={styles.list} key={donation._id}>
                <strong>{donation.name}</strong>
                <p>
                  Зібрано:
                  {" "}
                  {donation.currentValue}
                  {" "}
грн
{" "}
                  з
                  {" "}
                  {donation.goal}
                  {" "}
грн
                </p>
                <p>
                  Дедлайн:
                  {" "}
                  {new Date(donation.deadline).toLocaleDateString()}
                  {" "}
                  року
                </p>
              </li>
            ))}
          </ul>
          )}
        </div>

        <div className={styles.sectionContainer}>
        <div className={styles.blockShowHide}>
          <h3 className={styles.titleContainer}>Донати, на які завершився дедлайн:</h3>
          <button className={styles.buttonShowHide} onClick={() => toggleSectionVisibility("closeDonations")}>
{sectionVisibility.closeDonations ? "Приховати" : "Показати"}
          </button>
        </div>
          {sectionVisibility.closeDonations && (
          <ul className={styles.showList}>
            {closeDonations.map((donation) => (
              // eslint-disable-next-line no-underscore-dangle
              <li className={styles.list} key={donation._id}>
                <strong>{donation.name}</strong>
                <p>
                  Зібрано:
                  {" "}
                  {donation.currentValue}
                  {" "}
                  з
                  {" "}
                  {donation.goal}
                </p>
                <p>
                  Дедлайн:
                  {" "}
                  {new Date(donation.deadline).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
          )}
        </div>

        <div className={styles.sectionContainer}>
        <div className={styles.blockShowHide}>
          <h3 className={styles.titleContainer}>Благодійні лоти, на які перевищено збір:</h3>
          <button className={styles.buttonShowHide} onClick={() => toggleSectionVisibility("exceededDonations")}>
{sectionVisibility.exceededDonations ? "Приховати" : "Показати"}
          </button>
        </div>
          {sectionVisibility.exceededDonations && (
          <ul className={styles.showList}>
            {exceededDonations.map((donation) => (
              <li key={donation._id}>
                <strong>{donation.name}</strong>
                <p>{donation.category}</p>
                <p>
                  Зібрано:
                  {" "}
                  {donation.currentValue}
                  {" "}
                  з
                  {" "}
                  {donation.goal}
                </p>
              </li>
            ))}
          </ul>
          )}
        </div>
        
        </div>
      
      </section>
    </>
  );
}

export default AdminPage;
