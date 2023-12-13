import React from "react";
import styles from "../ProductView.module.scss";

function ClothesSelector({ updateCartItemSize, id }) {
  const clothingSizes = ["S", "M", " L", "XL", "XXL"];

  const handleSizeChange = (event) => {
    // eslint-disable-next-line no-unused-vars
    const selectedSize = event.target.value;
    updateCartItemSize(id, selectedSize);
  };

  return (
    <div className={styles.selectContainer}>
      <p className={styles.size}>Розмір:</p>
      <select className={styles.selectedOption} onChange={handleSizeChange}>
        {clothingSizes.map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ClothesSelector;
