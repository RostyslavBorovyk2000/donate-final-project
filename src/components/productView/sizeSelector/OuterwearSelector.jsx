import React from "react";
import styles from "../ProductView.module.scss";

function OuterwearSelector({ type }) {
  const clothingSizes = ["54", "55", "56", "57", "58", "59", "60", "61", "62"];

  const handleSizeChange = (event) => {
    // eslint-disable-next-line no-unused-vars
    const selectedSize = event.target.value;
  };

  return (
    <div className={styles.selectContainer}>

      <p className={styles.size}>Розмір:</p>
      { type === "cap" ? (
        <select className={styles.selectedOption} onChange={handleSizeChange}>
          {clothingSizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      ) : <p>Універсальний</p>}
      
    </div>
  );
}

export default OuterwearSelector;
