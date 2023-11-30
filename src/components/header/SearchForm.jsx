// import React from "react";
// import PropTypes from "prop-types";
// import Button from "../button/Button";
// import styles from "./Header.module.scss";

// function SearchForm({
//   inputValue, handleInputChange, handleSearch,
// }) {
//   return (
//     <div className={styles.searching}>
//       <div className={styles.inputWrapper}>
//         <input
//           className={styles.input}
//           type="text"
//           placeholder="Знайти..."
//           value={inputValue}
//           onChange={handleInputChange}
//           onKeyDown={(e) => {
//             if (e.key === "Enter") {
//               handleSearch();
//             }
//           }}
//         />
//       </div>
//       <div className={styles.searchButtons}>
//         <Button
//           toPage={`/products-search?query=${inputValue}`}
//           type="submit"
//           className={styles.searchBtn}
//           text="Знайти"
//           width="80px"
//         />
//       </div>
//     </div>
//   );
// }

// SearchForm.propTypes = {
//   inputValue: PropTypes.string.isRequired,
//   handleInputChange: PropTypes.func.isRequired,
//   handleSearch: PropTypes.func.isRequired,
// };

// export default SearchForm;
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from "../button/Button";
import styles from "./Header.module.scss";
import { updateInputValue } from "../../redux/actionsCreators/inputValueActionsCreators";

function SearchForm({ handleSearch }) {
  const dispatch = useDispatch();
  const [searchResults, setSearchResults] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  //  !
  console.log(categoryName);
  const inputValueFromRedux = useSelector((state) => state.inputValue.inputValue);
  const [inputValue, setInputValue] = useState(inputValueFromRedux);
  const [selectedProduct, setSelectedProduct] = useState(null);
  //  !
  console.log(selectedProduct);
  const [debounceTimeoutId, setDebounceTimeoutId] = useState(null);
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
      const searchPhrases = {
        // query: query,
        query,
      };
  
      const response = await axios.post("http://localhost:4000/api/products/search", searchPhrases);
      const products = response.data;
  
      setSearchResults(products);
  
      if (products.length > 0) {
        setCategoryName(products[0].category);
        setShowInput(true);
      } else {
        setCategoryName("");
        setShowInput(false);
      }
    } catch (error) {
      console.error("Error while searching for products:", error);
      setSearchResults([]);
      setCategoryName("");
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
          placeholder="Search..."
          value={inputValue}
          onChange={handleInputChange}
        />
      </div>
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
