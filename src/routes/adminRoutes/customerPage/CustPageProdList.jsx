import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import styles from "./CustomerPage.module.scss";


export default function CustPageProdList({ storeData }) {
  const [products, setProducts] = useState([]);
  const storeFavorites = useSelector((state) => state.favorites.items);
  const storeCart = useSelector((state) => state.cart.items);

  useEffect(() => {
    if (storeData === "Cart" && storeCart) {
      setProducts((storeCart));
    }
    if (storeData === "Favorites" && storeFavorites) {
      setProducts((storeFavorites));
    }
  }, [storeData, storeCart, storeFavorites]);

  return (
    <div className={styles.listWrapper}>
      {products && products.map((item) => (
        <li key={item.itemNo} className={styles.cardItemWrapper}>
          <p>
            -
            {item.name}
            ,
          </p>
          {item.quantity && item.currentPrice ? (
            <>
              <p>
                {item.quantity}
                {" "}
                шт.
              </p>
              <p className={styles.cardItemPrice}>
                Всього на:
                {item.currentPrice * item.quantity}
                грн
              </p>
            </>
          ) : null }
        </li>
      ))}
    </div>
  );
}

CustPageProdList.propTypes = {
  storeData: PropTypes.string.isRequired,
};
