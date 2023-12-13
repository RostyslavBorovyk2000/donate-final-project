import { useState } from "react";
import axios from "axios";
import { MAKE_ORDERS } from "../../../../endpoints/endpoints";
import Order from "./Order";
import styles from "./Orders.module.scss";


function OrderList() {
  const [orders, setOrders] = useState([]);
  const [sectionOpen, setSectionOpen] = useState(false);
  const [arrayLength, setArrayLength] = useState(0);

  const getOrders = async () => {
    try {
      const response = await axios.get(MAKE_ORDERS);
      setArrayLength(response.data.length);
      return response.data;
    } catch (err) {
      console.error("Помилка при отриманні даних:", err);
      throw err;
    }
  };

  async function getOrdersList() {
    const customerOrders = await getOrders();
    setOrders(customerOrders);
    setSectionOpen(true);
  }

  function getOrdersListHidden() {
    setSectionOpen(false);
  }


  return (
    <section className={styles.ordersWrapper}>
      <h2>Попередні покупки</h2>
      <div className={sectionOpen ? styles.ordersList : styles.hidden}>
        {arrayLength !== 0 ? (
          orders.map((item) => (
            // eslint-disable-next-line no-underscore-dangle
            <Order key={item._id} item={item} />
          ))
        ) : (
          <p className={styles.noPurchaseYet}>Ви ще не робили покупок</p>
        )}
      </div>
      <div className={styles.buttonsWrapper}>
        <button type="button" onClick={getOrdersList} className={styles.button}>Переглянути</button>
        <button type="button" onClick={getOrdersListHidden} className={styles.button}>Закрити</button>
      </div>
    </section>
  );
}

export default OrderList;
