/* eslint-disable react/button-has-type */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import HeartFavorite from "./icons/favorites/Heart";
import Button from "../button/Button";
import Cart from "./icons/cart/IconCart";
import IconEnter from "./icons/enter/IconEnter";
import IconOut from "./icons/enter/IconOut";
import { logOut } from "../../redux/actions/loggedInActions";
import { resetCart, resetFavorites } from "../../redux/actions/cartActions";
import styles from "./Header.module.scss";


function BurgerMenu({ toggleBar }) {
  const [isOpen, setIsOpen] = useState(false);
  const isUserLoggedIn = localStorage.getItem("userLogin") || null;
  const isLoggedInFromRedux = useSelector((state) => state.auth.isLoggedIn);
  const cartCount = useSelector((state) => state.cart.itemCount);
  const favoriteCount = useSelector((state) => state.favorites.itemCount);
  const dispatch = useDispatch();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    toggleBar();
  };

  async function doLogOut() {
    try {
      localStorage.removeItem("userLogin");
      localStorage.removeItem("isAdmin");
      localStorage.removeItem("CountCartProducts");
      localStorage.removeItem("CountFavoritesProducts");
      localStorage.removeItem("Cart");
      localStorage.removeItem("token");
      localStorage.removeItem("Favorites");
  
      dispatch(resetCart());
      dispatch(resetFavorites());
      dispatch(logOut());
    } catch (error) {
      console.error("Помилка при виході:", error);
    }
  }

  return (
    <nav className={styles.wrapperMenu}>
      <button className={styles.toggleButton} onClick={toggleMenu}>
        <div className={styles.bar} />
        <div className={styles.bar} />
        <div className={styles.bar} />
      </button>
      {isOpen && (
        <div className={`${styles.menuListWrapper} ${isOpen ? styles.open : ""}`}>
          <div className={styles.buttonWrapper}>
            <button className={`${styles.toggleButton} ${isOpen ? styles.cross : ""} ${styles.toggleButtonClose}`} onClick={toggleMenu}>
              <div className={styles.bar} />
              <div className={styles.bar} />
              <div className={styles.bar} />
            </button>
            <Button
              toPage={isLoggedInFromRedux ? "/" : "/log-in"}
              width="45px"
              color=""
              onClick={() => {
                if (isLoggedInFromRedux) {
                  doLogOut();
                }
                toggleMenu();
              }}
              className={`${styles.button} ${styles.buttonMobileHeader}`}
            >
              {isLoggedInFromRedux ? <IconOut /> : <IconEnter />}
            </Button>
          </div>
          <div className={styles.menuList} role="button" tabIndex={0} onKeyPress={toggleMenu}>
            <Link to="/" className={styles.menuItem} onClick={toggleMenu}>Головна</Link>
            <Link to="/about-us" className={styles.menuItem} onClick={toggleMenu}>Про Нас</Link>
            <Link to="/categories" className={styles.menuItem} onClick={toggleMenu}>Категорії</Link>
            <Link to="/blog" className={styles.menuItem} onClick={toggleMenu}>Новини</Link>
            { isUserLoggedIn ? <Link to="/account" onClick={toggleMenu} className={styles.menuItem}>Кабінет</Link> : null }
          </div>
          <div className={isUserLoggedIn ? styles.iconsWrapper : styles.iconsWrapperLogOut}>
            {isUserLoggedIn ? (
              <Link to="/favorites" className={`${styles.icon} ${styles.iconMobile}`} onClick={toggleMenu}>
                <HeartFavorite />
                {favoriteCount === 0 ? null : <span>{favoriteCount}</span>}
              </Link>
            ) : null}
            <Link to="/cart" className={`${styles.icon} ${styles.iconMobile}`} onClick={toggleMenu}>
              <Cart />
              {cartCount === 0 ? null : <span>{cartCount}</span>}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default BurgerMenu;

BurgerMenu.propTypes = {
  toggleBar: PropTypes.func,
};
