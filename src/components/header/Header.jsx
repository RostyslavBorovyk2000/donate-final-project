/* eslint-disable react/button-has-type */
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import { updateInputValue } from "../../redux/actionsCreators/inputValueActionsCreators";
import Cart from "./icons/cart/IconCart";
import IconEnter from "./icons/enter/IconEnter";
import IconOut from "./icons/enter/IconOut";
import { logOut } from "../../redux/actions/loggedInActions";
import Button from "../button/Button";
import Navigation from "./Navigation";
import { resetCart, resetFavorites } from "../../redux/actions/cartActions";
import { IconSearchMobile } from "./icons/search/IconSearch";
import HeartFavorite from "./icons/favorites/Heart";
import BurgerMenu from "./BurgerMenu";
import { REGISTRATION_URL } from "../../endpoints/endpoints";
import styles from "./Header.module.scss";


function Header() {
  const cartCount = useSelector((state) => state.cart.itemCount);
  const favoriteCount = useSelector((state) => state.favorites.itemCount);
  const isUserLoggedIn = localStorage.getItem("userLogin") || null;

  const isLoggedInFromRedux = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  
  const isMobileScreen = useMediaQuery("(max-width: 767px)");

  const [showBurgerMenu, setShowBurgerMenu] = useState(false);
  const [showInput, setShowInput] = useState(false);

  // const toggleInput = () => {
  //   setShowInput(!showInput);
  //   if (showBurgerMenu) {
  //     toggleBar();
  //   }
  // };

  const toggleBar = () => {
    setShowBurgerMenu(showBurgerMenu);
    if (showInput) {
      setShowInput(false);
    }
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
    try {
      const currentFavorites = JSON.parse(localStorage.getItem("Favorites")) || [];
      if (currentFavorites.length > 0) {
        await updateFavoritesToServer(currentFavorites);
      }
  
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
  
  const inputValueFromRedux = useSelector((state) => state.inputValue.inputValue);
  const [inputValue, setInputValue] = useState(inputValueFromRedux);
  // const navigate = useNavigate();

  // const handleSearch = () => {
  //   navigate(`/products-search?query=${inputValue}`);
  // };

  useEffect(() => {
    setInputValue(inputValueFromRedux);
  }, [inputValueFromRedux]);

  const handleInputChange = (e) => {
    const { value } = e.target;
    dispatch(updateInputValue(value));
    setInputValue(value);
  };

  return (
    <header className={styles.header}>
      <div className={styles.mobileHeader}>
        {/* <button className={styles.buttonMobileHeader} onClick={toggleInput}> */}
        {/* <button className={styles.buttonMobileHeader} onClick={toggleInput}>
          <IconSearchMobile />
        </button> */}
        <Button
          toPage={`/products-search?query=${inputValue}`}
          type="submit"
          className={styles.buttonMobileHeader}
          // text="Знайти"
          width="45px"
          color=""
        >
          <IconSearchMobile />
        </Button>
        {/* {showInput && ( */}
        <input
          className={styles.inputMobileHeader}
          type="text"
          onChange={handleInputChange}
          value={inputValue}
          placeholder="Знайти..."
        />
        {/* )} */}

        {isMobileScreen
          && <BurgerMenu toggleBar={toggleBar} />}
      </div>
         
      <div className={styles.headerLaptop}>

        {showBurgerMenu && <BurgerMenu />}
        <Navigation />

        {isUserLoggedIn ? (
          <>
            <div className={styles.navRightSideMenu}>
              <Link to="/favorites">
                <HeartFavorite />
              </Link>
              {favoriteCount === 0 ? null : <span>{favoriteCount}</span>}
            </div>
            <div className={styles.navRightSideMenu}>
              <Link to="/cart">
                <Cart />
              </Link>
              {cartCount === 0 ? null : <span>{cartCount}</span>}
            </div>
          </>
        ) : null}

        <Button toPage={isLoggedInFromRedux ? "/" : "/log-in"} width="40px" padding="10px" onClick={isLoggedInFromRedux ? doLogOut : null}>
          {isLoggedInFromRedux ? <IconOut /> : <IconEnter /> }
        </Button>
      </div>
    </header>
  );
}

export default Header;
