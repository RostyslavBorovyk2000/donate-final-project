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
import { setAuthToken } from "../../../../redux/actions/authActions";
import { SUBSCRIBE_URL, GET_CUSTOMER, GET_PRODUCTS_URL } from "../../../../endpoints/endpoints";


function AdminPage() {
  const [subscribers, setSubscribers] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [totalSubscribers, setTotalSubscribers] = useState(0);
  const [subscribersThisMonth, setSubscribersThisMonth] = useState(0);
  

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
    const getCustomers = async () => {
      try {
        const token = localStorage.getItem("token");
        setAuthToken(token);
        const response = await axios.get(GET_CUSTOMER);
        setCustomers(response.data);
      } catch (error) {
        console.error("Error get customers", error);
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
    getCustomers();
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

  return (
    <>
      <DocumentTitle title="Кабінет адміністратора" />
      <section>
        <div>
          <h1 className={styles.adminSectionHeadline}>Кабінет адміністратора</h1>
        </div>
        <div className={styles.mainSection}>
        <div className={styles.sectionContainer}>
          <h3 className={styles.titleContainer}>Підписники:</h3>
          <p className={styles.emailQuantity}>
            Всього:
            {" "}
            <strong>
              {totalSubscribers}
            </strong>
            {" "}
            підписників.
          </p>

          <p className={styles.emailQuantity}>
            За поточний місяць:
            {" "}
            <strong>
              {subscribersThisMonth}
            </strong>
            {" "}
            підписників.
          </p>
        </div>



        {/* <p className={styles.customerQuantity}>
            Кількість клієнтів:
            {" "}
            {customers.length}
            {" "}
            клієнтів
          </p> */}
        {/* <ul>
            {customers.map((customer) => (
              <li key={customer.id}>{customer.firstName}</li>
            ))}
          </ul> */}
        <div className={styles.sectionContainer}>
          <h3 className={styles.titleContainer}>Донати на які ще не завершився дедлайн</h3>
          <ul>
            {activeDonations.map((donation) => (
              // eslint-disable-next-line no-underscore-dangle
              <li className={styles.list} key={donation._id}>
                <strong>{donation.name}</strong>
                <p className={styles.emailQuantity}>
                  Зібрано:
                  {" "}
                  {donation.currentValue}
                  {" "}
                  з
                  {" "}
                  {donation.goal}
                </p>
                <p className={styles.emailQuantity}>
                  Дедлайн:
                  {" "}
                  {new Date(donation.deadline).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.sectionContainer}>
          <h3 className={styles.titleContainer}>Донати на які завершився дедлайн</h3>
          <ul>
            {closeDonations.map((donation) => (
              // eslint-disable-next-line no-underscore-dangle
              <li className={styles.list} key={donation._id}>
                <strong>{donation.name}</strong>
                <p className={styles.emailQuantity}>
                  Зібрано:
                  {" "}
                  {donation.currentValue}
                  {" "}
                  з
                  {" "}
                  {donation.goal}
                </p>
                <p className={styles.emailQuantity}>
                  Дедлайн:
                  {" "}
                  {new Date(donation.deadline).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.sectionContainer}>
          <h3 className={styles.titleContainer}>Благодійні лоти, на які перевищено збір</h3>
          <ul>
            {exceededDonations.map((donation) => (
              <li key={donation._id}>
                <strong>{donation.name}</strong>
                <p className={styles.emailQuantity}>{donation.category}</p>
                <p className={styles.emailQuantity}>
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
        </div>
        
        </div>
      
      </section>
    </>
  );
}

export default AdminPage;
