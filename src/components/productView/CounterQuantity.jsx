// import styles from "./ProductView.module.scss";

// function QuantityCounter({ quantity, handleChangeQuantity }) {
//   // const handleIncrease = () => {
//   //   setQuantity(quantity + 1);
//   // };

//   // const handleDecrease = () => {
//   //   if (quantity > 1) {
//   //     setQuantity(quantity - 1);
//   //   }
//   // };
//   const handleIncrease = () => {
//     handleChangeQuantity(1);
//   };

//   const handleDecrease = () => {
//     handleChangeQuantity(-1);
//   };

//   return (
//     <div className={styles.quantityCounter}>
//       <button
//         className={styles.decrease}
//         onClick={handleDecrease}
//         type="button"
//       >
//         -
//       </button>
//       <input
//         type="text"
//         value={quantity}
//         onChange={(e) => handleChangeQuantity(parseInt(e.target.value, 10))}
//         className={styles.quantity}
//       />
//       <button
//         className={styles.increase}
//         onClick={handleIncrease}
//         type="button"
//       >
//         +
//       </button>
//     </div>
//   );
// }

// export default QuantityCounter;

// import React from "react";
// import styles from "./ProductView.module.scss";

// function QuantityCounter({ quantity, handleChangeQuantity }) {
//   const handleIncrease = () => {
//     handleChangeQuantity(1); // Збільшуємо кількість на 1
//   };

//   const handleDecrease = () => {
//     if (quantity > 1) {
//       handleChangeQuantity(-1); // Зменшуємо кількість на 1, але не менше 1
//     }
//   };

//   return (
//     <div className={styles.quantityCounter}>
//       <button className={styles.decrease} onClick={handleDecrease} type="button">-</button>
//       <input
//         type="text"
//         value={quantity}
//         readOnly // Забороняємо редагування input зовнішньо
//         className={styles.quantity}
//       />
//       <button className={styles.increase} onClick={handleIncrease} type="button">+</button>
//     </div>
//   );
// }

// export default QuantityCounter;

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
          readOnly // Забороняємо редагування input зовнішньо
          className={styles.quantity}
        />
        <button className={styles.increase} onClick={handleIncrease} type="button">+</button>
      </div>
    </div>
  );
}

export default QuantityCounter;
