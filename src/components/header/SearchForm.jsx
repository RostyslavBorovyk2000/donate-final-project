import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import { updateInputValue } from "../../redux/actionsCreators/inputValueActionsCreators";
import { GET_PRODUCTS_URL, GET_SEARCH } from "../../endpoints/endpoints";
import styles from "./Header.module.scss";

function SearchForm() {
  const dispatch = useDispatch();
  const [searchResults, setSearchResults] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const inputValueFromRedux = useSelector((state) => state.inputValue.inputValue);
  const [inputValue, setInputValue] = useState(inputValueFromRedux);
  const [debounceTimeoutId, setDebounceTimeoutId] = useState(null);
  const getProductDetails = async (productId) => {
    try {
      await axios.get(`${GET_PRODUCTS_URL}/${productId}`);
    } catch (error) {
      console.error("Помилка при отриманні деталей товару:", error);
    }
  };

  const performSearch = async (query) => {
    try {
      const searchPhrases = {
        query,
      };
  
      const response = await axios.post(GET_SEARCH, searchPhrases);
      const products = response.data;
  
      setSearchResults(products);
  
      if (products.length > 0) {
        setShowInput(true);
      } else {
        setShowInput(false);
      }
    } catch (error) {
      console.error("Error while searching for products:", error);
      setSearchResults([]);
      setShowInput(false);
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

    if (debounceTimeoutId) {
      clearTimeout(debounceTimeoutId);
    }

    if (value === "") {
      setSearchResults([]);
      handleResultClick();
    } else {
      const newTimeoutId = setTimeout(() => {
        performSearch(value);
      }, 1000);
      
      setDebounceTimeoutId(newTimeoutId);
    }
  };

  return (
    <div className={styles.searching}>
      <div className={styles.inputWrapper}>
        <input
          className={styles.input}
          type="text"
          placeholder="Пошук..."
          value={inputValue}
          onChange={handleInputChange}
        />
        {showInput && (
        <div className={styles.searchResults}>
          <ul>
            {searchResults.length > 0 && inputValue !== "" && (
              searchResults.map((result) => (
                <li className={styles.searchResultItem} key={result.id}>
                  <Link to={`/product/${result.itemNo}`} key={result.id} className={styles.searchResultItem}>
                    {result.shortName}
                  </Link>
                </li>
              ))
            )}
          </ul>
        </div>
        )}
      </div>
    </div>
  );
}

export default SearchForm;
