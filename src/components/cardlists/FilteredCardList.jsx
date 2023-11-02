import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { GET_PRODUCTS_URL } from "../../endpoints/endpoints";
import CardList from "./CardList";
import Spinner from "../spinner/Spinner";
import shuffleArray from "../../scripts/shuffleArray";


export default function FilteredCardList({ property, value, priceRange }) {
  const priceLow = priceRange ? priceRange[0] : 0;
  const priceHigh = priceRange ? priceRange[1] : Infinity;
  const [prevPriceRange, setPrevPriceRange] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredData, setFilteredData] = useState([]);
    
  useEffect(() => {
    if (JSON.stringify(prevPriceRange) === JSON.stringify(priceRange)) {
      return;
    }
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(GET_PRODUCTS_URL);
        const products = response.data;
  
        if (!Array.isArray(products)) {
          setIsLoading(false);
          return;
        }
  
        const newData = [];
        products.forEach((item) => {
          if (
            (Array.isArray(value) && value.includes(item[property]))
            || (item[property] === value)
          ) {
            const price = item.currentPrice ?? 0;
            if (price >= priceLow && price <= priceHigh) {
              newData.push(item);
            }
          }
        });

        const mixedData = shuffleArray([...newData]);
        setPrevPriceRange(priceRange);
        setFilteredData(mixedData);
      } catch (error) {
        console.error("Помилка при завантаженні даних:", error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchData();
  }, [property, value, priceRange, priceLow, priceHigh, prevPriceRange]);
  
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {isLoading ? <Spinner /> : <CardList items={filteredData} />}
    </>
  );
}


FilteredCardList.propTypes = {
  property: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.bool,
  ]).isRequired,
};

