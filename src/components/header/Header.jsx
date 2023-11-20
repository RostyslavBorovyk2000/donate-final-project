import React, { useState, useEffect, useRef } from "react";
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
  const isLoggedInFromRedux = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const isMobileScreen = useMediaQuery("(max-width: 767px)");

  const [showBurgerMenu, setShowBurgerMenu] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const inputValueFromRedux = useSelector((state) => state.inputValue.inputValue);
  const [inputValue, setInputValue] = useState(inputValueFromRedux);
  const searchResultsRef = useRef(null);

  const [selectedProduct, setSelectedProduct] = useState(null);

  const getProductDetails = async (productId) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/products/${productId}`);
      setSelectedProduct(response.data);
    } catch (error) {
      console.error("Помилка при отриманні деталей товару:", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchResultsRef.current && !searchResultsRef.current.contains(event.target)) {
        setSearchResults([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchResultsRef]);

  const toggleBar = () => {
    setShowBurgerMenu(!showBurgerMenu);
    if (showInput) {
      setShowInput(false);
    }
  };

  const updateFavoritesToServer = async (newFavorites) => {
    try {
      const response = await axios.put(REGISTRATION_URL, { favorites: newFavorites });
      return response.data.favorites;
    } catch (error) {
      console.error("Помилка при оновленні улюблених товарів:", error);
      return null;
    }
  };

  const doLogOut = async () => {
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
  };
  const [categoryName, setCategoryName] = useState('');

  const performSearch = async (query) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/products`);
      const filteredResults = response.data.filter((result) =>
        result.shortName.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filteredResults);

     
      if (filteredResults.length > 0) {
        setCategoryName(filteredResults[0].category);
      } else {
        setCategoryName(''); 
      }
    } catch (error) {
      console.error("Помилка при пошуку товарів:", error);
      setSearchResults([]);
      setCategoryName('');
    }
  };

  const handleResultClick = async (result) => {
    setSearchResults([]);
    setShowInput(false);
  
    if (result) {
      await getProductDetails(result.id);
    }
  };
  const handleInputChange = (e) => {
    const { value } = e.target;
    dispatch(updateInputValue(value));
    setInputValue(value);

    if (value === "") {
      setSearchResults([]);
      handleResultClick();
    } else {
      const words = value.split(' ');
      performSearch(words[0]);
    }
  };
  
  return (
    <header className={styles.header}>
      <div className={styles.mobileHeader}>
        <Button
          toPage={`/products-search?query=${inputValue}`}
          type="submit"
          className={styles.buttonMobileHeader}
          width="45px"
          color=""
        >
          <IconSearchMobile />
        </Button>
        <input
          ref={searchResultsRef}
          className={styles.inputMobileHeader}
          type="text"
          onChange={handleInputChange}
          value={inputValue}
          placeholder="Знайти..."
        />
{searchResults.length > 0 && inputValue !== "" && (
  <div className={styles.searchResults} ref={searchResultsRef}>
    {searchResults.map((result) => (
      <li className={styles.searchResultItem} key={result.id}>
        <Link to={`/product/${result.itemNo}`} key={result.id} className={styles.searchResultItem}>
          {result.shortName}
        </Link>
      </li>
    ))}
    {searchResults.length > 0 && searchResults[0].subcategory && (
      <p className={styles.categoryName}>
        <Link to={`/products-search?query=${inputValue}`}>{searchResults[0].subcategory}</Link>
      </p>
    )}
    {categoryName && (
      <p className={styles.categoryName}>
        {categoryName === 'Одяг' ? (
          <Link to="/categories/military-clothing">Одяг</Link>
        ) : categoryName === 'Донат' ? (
          <Link to="/categories/donation">Донат</Link>
        ) : categoryName === 'Благодійний лот' || categoryName === 'Благодійний лот' ? (
          <Link to="/categories/charity-auction">Лот</Link>
        ) : null
      }
      </p>
    )}
  </div>
)}


        {isMobileScreen && <BurgerMenu toggleBar={toggleBar} />}
      </div>


      <div className={styles.headerLaptop}>
        {showBurgerMenu && <BurgerMenu />}
        <Navigation />

        {isLoggedInFromRedux ? (
          <>
            <Link to="/favorites">
              <HeartFavorite />
            </Link>
            {favoriteCount === 0 ? null : <span>{favoriteCount}</span>}
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
