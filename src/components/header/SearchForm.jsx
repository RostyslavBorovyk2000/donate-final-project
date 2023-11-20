import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Button from "../button/Button";
import styles from "./Header.module.scss";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateInputValue } from "../../redux/actionsCreators/inputValueActionsCreators";

function SearchForm({ handleSearch }) {
  const dispatch = useDispatch();
  const [searchResults, setSearchResults] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const inputValueFromRedux = useSelector((state) => state.inputValue.inputValue);
  const [inputValue, setInputValue] = useState(inputValueFromRedux);

  const getProductDetails = async (productId) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/products/${productId}`);
      setSelectedProduct(response.data);
    } catch (error) {
      console.error("Помилка при отриманні деталей товару:", error);
    }
  };


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

  const handleCategoryClick = async (category) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/products?category=${category}`);
      setSearchResults(response.data);
      setCategoryName(category);
      setShowInput(true);
    } catch (error) {
      console.error("Помилка при отриманні товарів за категорією:", error);
      setSearchResults([]);
      setCategoryName('');
      setShowInput(false);
    }
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    dispatch(updateInputValue(value));
    setInputValue(value);
  
    if (value === "") {
      setSearchResults([]);
      setShowInput(false);
    } else {
      const words = value.split(' ');
      performSearch(words[0]);
      setShowInput(true);
    }
  };

  const handleResultClick = async (result) => {
    setSearchResults([]);
    setShowInput(false);
  
    if (result) {
      await getProductDetails(result.id);
    }
  };

  return (
    <div className={styles.searching}>
      <div className={styles.inputWrapper}>
        <input
          className={styles.input}
          type="text"
          placeholder="Search..."
          value={inputValue}
          onChange={handleInputChange}
        />
      </div>
      {showInput && (
  <div className={styles.searchResults}>
    {searchResults.map((result) => (
      <li className={styles.searchResultItem} key={result.id}>
        <Link
          to={`/product/${result.itemNo}`}
          className={styles.searchResultItem}
          onClick={() => handleResultClick(result)}
        >
          {result.shortName}
        </Link>
      </li>
    ))}
    {searchResults.length > 0 && searchResults[0].subcategory && (
      <p className={styles.categoryName}>
        <Link to={`/products-search?query=${inputValue}`}>{searchResults[0].subcategory}</Link>
      </p>
    )}
    {searchResults.length > 0 && (
      <p className={styles.categoryName}>
        {searchResults[0].category === 'Одяг' ? (
          <Link to="/categories/military-clothing">Одяг</Link>
        ) : searchResults[0].category === 'Донат' ? (
          <Link to="/categories/donation">Донат</Link>
        ) : searchResults[0].category === 'Благодійний лот' || searchResults[0].category === 'Благодійний лот' ? (
          <Link to="/categories/charity-auction">лот або аукціон</Link>
        ) : null
      }
      </p>
    )}
  </div>
)}


      <div className={styles.searchButtons}>
        <Button
          type="button"
          className={styles.searchBtn}
          text="Search"
          width="80px"
          onClick={() => handleSearch(inputValue)}
        />
      </div>
    </div>
  );
}

SearchForm.propTypes = {
  handleSearch: PropTypes.func.isRequired,
};

export default SearchForm;
