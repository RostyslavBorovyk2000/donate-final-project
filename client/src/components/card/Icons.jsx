/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import Basket from "./icons/basket/Basket";
import Heart from "./icons/heart/Heart";
import BasketFull from "./icons/basket/BasketFull";
import HeartFull from "./icons/heart/HeartFull";
import styles from "./Card.module.scss";
// import ModalSetTimeOut from "../modalSetTimeout/modalSetTimeOut";


export function Icons({
  itemNo, category, handleAddFavorites, handleAddToCart,
}) {
  // eslint-disable-next-line max-len
  const isItemInCart = useSelector((state) => state.cart.items.some((cartItem) => cartItem.itemNo === itemNo));
  // eslint-disable-next-line max-len
  const isItemInFavorites = useSelector((state) => state.favorites.items.some((favItem) => favItem.itemNo === itemNo));
  const isUserLoggedIn = localStorage.getItem("userLogin") || null;

  const showBasketIcon = isUserLoggedIn && (category !== "Благодійний лот" && category !== "Донат");
  const showHeartIcon = isUserLoggedIn;
  
  return (
    <div className={styles.cardItemIconsWrapper}>
      {showBasketIcon && (
        <div className={styles.cardItemIconWrapper} onClick={handleAddToCart}>
          {/* {isModalVisible && <ModalSetTimeOut message="Товар добавлено до обраного" />} */}
          {isItemInCart ? <BasketFull /> : <Basket />}
        </div>
      )}
      {showHeartIcon && (
        <div className={styles.cardItemIconWrapper} onClick={handleAddFavorites}>
          {/* {isModalVisibleTwo && <ModalSetTimeOut message="Товар добавлено до кошика" />} */}
          {isItemInFavorites ? <HeartFull /> : <Heart />}
        </div>
      )}
    </div>
  );
}


Icons.propTypes = {
  itemNo: PropTypes.string.isRequired,
  // category: PropTypes.string.isRequired,
  handleAddFavorites: PropTypes.func.isRequired,
  handleAddToCart: PropTypes.func.isRequired,
};
