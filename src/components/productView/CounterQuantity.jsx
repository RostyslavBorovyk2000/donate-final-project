import styles from "./ProductView.module.scss";

function QuantityCounter({ quantity, setQuantity }) {
  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className={styles.quantityCounter}>
      <button
        className={styles.decrease}
        onClick={handleDecrease}
        type="button"
      >
        -
      </button>
      <input
        type="text"
        value={quantity}
        onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
        className={styles.quantity}
      />
      <button
        className={styles.increase}
        onClick={handleIncrease}
        type="button"
      >
        +
      </button>
    </div>
  );
}

export default QuantityCounter;
