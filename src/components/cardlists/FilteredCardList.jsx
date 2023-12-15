import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { GET_PRODUCTS_URL } from "../../endpoints/endpoints";
import CardList from "./CardList";
import Spinner from "../spinner/Spinner";
import PaginationPages from "../paginationPages/PaginationPages";
import shuffleArray from "../../scripts/shuffleArray";

export default function FilteredCardList({
  property, value, priceRange, subcategory, brand, color, sortType, query,
}) {
  const priceLow = priceRange ? priceRange[0] : 0;
  const priceHigh = priceRange ? priceRange[1] : Infinity;
  const [prevSubcategory, setPrevSubcategory] = useState([]);
  const [prevColor, setPrevColor] = useState([]);
  const [prevBrand, setPrevBrand] = useState([]);
  const [prevPriceRange, setPrevPriceRange] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredData, setFilteredData] = useState([]);
  const [sortedData, setSortedData] = useState([]);

  useEffect(() => {
    if (JSON.stringify(prevPriceRange) === JSON.stringify(priceRange)
    && prevSubcategory === subcategory && prevBrand === brand && prevColor === color) {
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
              if (!subcategory || item.subcategory === subcategory) {
                if (!color || item.color === color) {
                  if (!brand || item.brand === brand) {
                    newData.push(item);
                  }
                }
              }
            }
          }
        });

        const mixedData = shuffleArray([...newData]);
        setPrevPriceRange(priceRange);
        setPrevSubcategory(subcategory);
        setPrevBrand(brand);
        setPrevColor(color);
        setFilteredData(mixedData);
      } catch (error) {
        console.error("Помилка при завантаженні даних:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [property, value, priceRange, priceLow, priceHigh, prevPriceRange,
    subcategory, prevSubcategory, brand, prevBrand, color, prevColor]);

  useEffect(() => {
    const sortProducts = (a, b) => {
      const locale = "uk";
    
      switch (sortType) {
        case "alphabetAsc":
          return a.name.localeCompare(b.name, locale);
        case "alphabetDesc":
          return b.name.localeCompare(a.name, locale);
        case "priceAsc":
          return parseFloat(a.currentPrice) - parseFloat(b.currentPrice);
        case "priceDesc":
          return parseFloat(b.currentPrice) - parseFloat(a.currentPrice);
        case "oldestFirst default":
          return new Date(a.startDate) - new Date(b.startDate);
        case "newestFirst":
          return new Date(b.startDate) - new Date(a.startDate);
        case "endDate":
          return new Date(a.deadline) - new Date(b.deadline);
        case "percentageFound":
          return calculateFundsPercentage(a) - calculateFundsPercentage(b);
        case "firstNew":
          return new Date(b.startDate) - new Date(a.startDate);
        case "expirationDate":
          return new Date(a.endDate) - new Date(b.endDate);
        case "lowestBid":
          return a.currentValue - b.currentValue;
        case "highestBid":
          return b.currentValue - a.currentValue;
        default:
          return 0;
      }
    };

    const calculateFundsPercentage = (item) => {
      const currentValue = parseFloat(item.currentValue) || 0;
      const goal = parseFloat(item.goal) || 1;
      return (currentValue / goal) * 100;
    };
    
    
    const sorted = [...filteredData].sort(sortProducts);
    setSortedData(sorted);
  }, [filteredData, sortType]);

  const [coods, setCoods] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [goodsPearPages] = useState(12);
  const lastCoodsIndex = currentPage * goodsPearPages;
  const firstCoodsIndex = lastCoodsIndex - goodsPearPages;
  const currentCoods = coods.slice(firstCoodsIndex, lastCoodsIndex);
  const paginateFunc = (pageNumber) => setCurrentPage(pageNumber);
  useEffect(() => {
    const getGoods = async () => {
      if (query !== "") {
        const coodsFiltre = sortedData.filter((product) => product.category === `${query}`);
        setCoods(coodsFiltre);
      } else {
        setCoods(sortedData);
      }
    };

    getGoods();
  }, [query, sortType, sortedData]);
    
  return (
    <div>
      <div>
        {isLoading ? <p>Loading...</p> : <CardList items={currentCoods} />}
      </div>
      <div>
        <PaginationPages
          goodsPearPages={goodsPearPages}
          tottalCoods={coods.length}
          paginateFunc={paginateFunc}
        />
      </div>
    </div>
  );
}


export function MainFilteredCardList({ property, value }) {
  const [isLoading, setIsLoading] = useState(true);
  const [productsPopular, setProductsPopular] = useState([]);
    
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("http://localhost:4000/api/products/filter?isPopular=true&perPage=12");
        const products = response.data;
  
        if (!Array.isArray(products.products)) {
          setIsLoading(false);
          return;
        }

        const mixedData = shuffleArray([...products.products]);
        setProductsPopular(mixedData);
  
        const newData = [];
        products.products.forEach((item) => {
          if (
            (Array.isArray(value) && value.includes(item[property]))
            || (item[property] === value)
          ) {
            newData.push(item);
          }
        });
      } catch (error) {
        console.error("Помилка при завантаженні даних:", error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchData();
  }, [property, value]);
 
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {isLoading ? <Spinner /> : <CardList items={productsPopular} />}
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
  priceRange: PropTypes.arrayOf(PropTypes.number),
  subcategory: PropTypes.string,
  brand: PropTypes.string,
  color: PropTypes.string,
  sortType: PropTypes.string,
};
