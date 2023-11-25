/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import Basket from "./icons/basket/Basket";
import Heart from "./icons/heart/Heart";
import BasketFull from "./icons/basket/BasketFull";
import HeartFull from "./icons/heart/HeartFull";
import styles from "./Card.module.scss";

function LoginModal() {
  return (
    <div className={styles.loginModal}>
      Спершу авторизуйтесь
    </div>
  );
}


export function Icons({
  itemNo, category, handleAddFavorites, handleAddToCart, loggedIn,
}) {
  // eslint-disable-next-line max-len
  const isItemInCart = useSelector((state) => state.cart.items.some((cartItem) => cartItem.itemNo === itemNo));
  // eslint-disable-next-line max-len
  const isItemInFavorites = useSelector((state) => state.favorites.items.some((favItem) => favItem.itemNo === itemNo));
  const showBasketIcon = category !== "Благодійний лот" && category !== "Донат";

  // window
  const [showLoginModal, setShowLoginModal] = useState(false);
  const timerRef = useRef();
  function promptLogin() {
    setShowLoginModal(true);
    timerRef.current = setTimeout(() => {
      setShowLoginModal(false);
    }, 2000);
  }
  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  }, []);
  
  
  return (
    <>
      <div className={!showLoginModal ? styles.cardItemIcons : styles.showLoginModal}>
        {showBasketIcon && (
          <div className={styles.cardItemIconWrapper} onClick={handleAddToCart}>
            {isItemInCart ? <BasketFull /> : <Basket />}
          </div>
        )}
        {/* eslint-disable-next-line max-len */}
        <div className={styles.cardItemIconWrapper} onClick={loggedIn ? handleAddFavorites : promptLogin}>
          {isItemInFavorites ? <HeartFull /> : <Heart />}
        </div>
      </div>
      { showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} /> }
    </>
  );
}


Icons.propTypes = {
  itemNo: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  handleAddFavorites: PropTypes.func.isRequired,
  handleAddToCart: PropTypes.func.isRequired,
};
