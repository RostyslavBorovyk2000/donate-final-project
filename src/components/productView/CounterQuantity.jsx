import React from "react";
import styles from "./ProductView.module.scss";

function QuantityCounter({ quantity, handleChangeQuantity }) {
  const handleIncrease = () => {
    handleChangeQuantity(1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      handleChangeQuantity(-1);
    }
  };

  return (
    <div className={styles.quantityCounter}>
      <p>Кількість:</p>
      <div>
        <button className={styles.decrease} onClick={handleDecrease} type="button">-</button>
        <input
          type="text"
          value={quantity}
          readOnly
          className={styles.quantity}
        />
        <button className={styles.increase} onClick={handleIncrease} type="button">+</button>
      </div>
    </div>
  );
}

export default QuantityCounter;
