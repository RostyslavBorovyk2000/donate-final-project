import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import AppRoutes from "../routes/AppRoutes";
import { initializeCart, initializeFavorites } from "../redux/actions/cartActions";
import { setAuthToken } from "../redux/actions/authActions";
import { getProducts } from "../api/getProducts";
import { getFilters } from "../api/getFilters";
import Context from "./Context";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import Main from "./main/Main";
import { logIn } from "../redux/actions/loggedInActions";
import { setProducts } from "../redux/actions/productActions";
import { setFilters } from "../redux/actions/filterActions";
import ScrollToTop from "./ScrollToTop";
import { FormButton } from "./button/Button";
import { NEW_CART_URL, NEW_FAVORITES_URL } from "../endpoints/endpoints";
import AppArrow from "../images/appArrow/AppArrow";
import styles from "./App.module.scss";



function App() {
  const [isLinkVisible, setIsLinkVisible] = useState(true);
  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const contextData = { isLinkVisible, setIsLinkVisible };
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      dispatch(setAuthToken(token));
      dispatch(logIn());
    }
  }, [dispatch]);

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("Cart")) || [];
    const storedFavoriteItems = JSON.parse(localStorage.getItem("Favorites")) || [];

    if (storedCartItems.length > 0) {
      dispatch(initializeCart(storedCartItems));
    }
    if (storedFavoriteItems.length > 0) {
      dispatch(initializeFavorites(storedFavoriteItems));
    }
  }, [dispatch]);


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    const getCartFromServer = async () => {
      if (isLoggedIn) {
        try {
          const response = await axios.get(NEW_CART_URL);
          return response.data;
        } catch (err) {
          return null;
        }
      } else {
        return null;
      }
    };

    const fetchData = async () => {
      const cartData = await getCartFromServer();
      if (cartData !== null && Array.isArray(cartData.products)) {
        const productArray = cartData.products.map((item) => item.product);
        dispatch(initializeCart(productArray));
      }
    };

    const getFavoritesFromServer = async () => {
      if (isLoggedIn) {
        try {
          const response = await axios.get(NEW_FAVORITES_URL);
          return response.data;
        } catch (err) {
          return null;
        }
      } else {
        return null;
      }
    };

    const fetchFavoritesData = async () => {
      const favoritesData = await getFavoritesFromServer();
      if (favoritesData !== null && Array.isArray(favoritesData.products)) {
        const productArray = favoritesData.products.map((item) => item);
        dispatch(initializeFavorites(productArray));
      }
    };


    if (isLoggedIn) {
      fetchData();
      fetchFavoritesData();
    }
  }, [dispatch, isLoggedIn]);


  useEffect(() => {
    getProducts()
      .then((data) => {
        dispatch(setProducts(data));
      })
      .catch((error) => {
        console.error("Помилка при отриманні товарів:", error);
      });
      
    getFilters()
      .then((data) => {
        dispatch(setFilters(data));
      })
      .catch((error) => {
        console.error("Помилка при отриманні товарів:", error);
      });
  }, [dispatch]);

  // Arrow button
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  useEffect(() => {
    const handleScroll = () => {
      const show = window.scrollY > 50;
      setIsVisible(show);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);



  return (
    <div className={styles.container}>
      <BrowserRouter>
        <ScrollToTop />
        <Context.Provider value={contextData}>
          <Header />
          <Main>
            <AppRoutes />
          </Main>
          <Footer />
          {isVisible && (
            <FormButton padding="6px 0px" width="50px" onClick={scrollToTop} className={styles.scrollToTopButton}>
              <AppArrow />
            </FormButton>
          )}

        </Context.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
