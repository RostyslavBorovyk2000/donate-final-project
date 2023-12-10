import styles from "./Orders.module.scss";

function formatDate(dateString) {
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Europe/Kiev",
  };
  return new Date(dateString).toLocaleString("uk-UA", options).replace(/\//g, "-");
}

function Order({ item }) {
  const formattedDate = formatDate(item.date);

  if (item.totalSum === 0) {
    return null;
  }

  return (
    <section className={styles.orderWrapper}>
      <div className={styles.orderNoWrapper}>
        <div className={styles.orderNo}>
          <p>Дата</p>
          <p>{formattedDate}</p>
        </div>
        <div className={styles.orderNo}>
          <p>Ордер</p>
          <p>{item.orderNo}</p>
        </div>
      </div>
      <div className={styles.orderItems}>
        {item.products.map((i) => (
        // eslint-disable-next-line no-underscore-dangle
          <div key={i._id} className={styles.item}>
            <p className={styles.name}>{i.product.name}</p>
            <p>{i.product.cartQuantity}</p>
            <p>
              {i.product.currentPrice}
              &nbsp;грн
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Order;

