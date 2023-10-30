/* eslint-disable react/button-has-type */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";
import HeartFavorite from "./icons/favorites/Heart";
import Button from "../button/Button";
import Cart from "./icons/cart/IconCart";
import IconEnter from "./icons/enter/IconEnter";
import IconOut from "./icons/enter/IconOut";
import { logOut } from "../../redux/actions/loggedInActions";
import { resetCart, resetFavorites } from "../../redux/actions/cartActions";
import { REGISTRATION_URL } from "../../endpoints/endpoints";


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

  async function updateFavoritesToServer(newFavorites) {
    const updatedCustomer = {
      favorites: newFavorites,
    };

    try {
      const response = await axios.put(REGISTRATION_URL, updatedCustomer);
      return response.data.favorites;
    } catch (err) {
      console.error("Помилка при отриманні даних:", err);
      return null;
    }
  }

  async function doLogOut() {
    console.log("!");
    try {
      const currentFavorites = JSON.parse(localStorage.getItem("Favorites")) || [];
      if (currentFavorites.length > 0) {
        await updateFavoritesToServer(currentFavorites);
      }
  
      localStorage.removeItem("userLogin");
      localStorage.removeItem("isAdmin");
      localStorage.removeItem("CountCartProducts");
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
          <div className={styles.iconsWrapper}>
            {isUserLoggedIn ? (
              <>
                <Link to="/favorites" className={`${styles.icon} ${styles.iconMobile}`} onClick={toggleMenu}>
                  <HeartFavorite />
                  {favoriteCount === 0 ? null : <span>{favoriteCount}</span>}
                </Link>
                <Link to="/cart" className={`${styles.icon} ${styles.iconMobile}`} onClick={toggleMenu}>
                  <Cart />
                  {cartCount === 0 ? null : <span>{cartCount}</span>}
                </Link>
              </>
            ) : null}
          </div>
        </div>
      )}
    </nav>
  );
}

export default BurgerMenu;


