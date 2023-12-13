/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CardList from "./CardList";
import Spinner from "../spinner/Spinner";
import styles from "./AllCategoriesCardList.module.scss";
import { getProducts } from "../../api/getProducts";
import { SortComponent, SortDonateComponent, SortLotsComponent } from "../sortComponent/SortComponent";
import SliderPrice from "../sliderPrice/SliderPrice";

function getUniqueList(list) {
  return [...new Set(list)];
}

export default function CategoriesCardList() {
  const [items, setItems] = useState([]);
  const [selectedValue, setSelectedValue] = useState("Одяг");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSubCategory, setSelectedSubCategory] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState([]);
  const [selectedColor, setSelectedColor] = useState([]);
  const [sortType, setSortType] = useState("default");
  const productsList = useSelector((state) => state.products.items);
  const filtersList = useSelector((state) => state.filters.items);
  const navigate = useNavigate();
  const [tempSliderValue, setTempSliderValue] = useState([100, 10000]);
  const [prevTempSliderValue, setPrevTempSliderValue] = useState(null);
  const [priceRange, setPriceRange] = useState({
    minPrice: tempSliderValue[0],
    maxPrice: tempSliderValue[1],
  });

 

  const applyFilter = () => {
    if (
      prevTempSliderValue
      && (tempSliderValue[0] === prevTempSliderValue[0]
        && tempSliderValue[1] === prevTempSliderValue[1])
    ) {
      return;
    }
  
    const filtered = productsList.filter(
      (product) => product.currentPrice >= tempSliderValue[0]
        && product.currentPrice <= tempSliderValue[1],
    );
  
    setItems(filtered);
    setPrevTempSliderValue([...tempSliderValue]);
  };

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedValue, selectedSubCategory, selectedBrand,
    selectedColor, productsList, priceRange]);

    

  function fetchProducts() {
    setIsLoading(true);

    const params = {};

    if (selectedValue) {
      params.category = selectedValue;
    }

    if (selectedSubCategory) {
      params.subcategory = selectedSubCategory;
    }

    if (selectedBrand) {
      params.brand = selectedBrand;
    }

    if (selectedColor) {
      params.color = selectedColor;
    }


    const queryParams = new URLSearchParams(params).toString();
    navigate(`/categories?${queryParams}`);

    console.log("API params:", params);
    getProducts(params)
      .then((data) => {
        setItems(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Помилка при отриманні товарів:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
  useEffect(() => {
    setItems(productsList);
  }, [productsList]);

  const handleChange = (e) => {
    const selectCategory = e.target.value;
    setSelectedValue(selectCategory === selectedValue ? "" : selectCategory);
    setSelectedSubCategory("");
  };

  const handleSubCategoryChange = (e) => {
    const subCategory = e.target.value;
    setSelectedSubCategory((prevSubCategory) => (prevSubCategory === subCategory ? "" : subCategory));
  };

  const handleBrandChange = (e) => {
    const brand = e.target.value;
    setSelectedBrand((prevSelectedBrand) => (prevSelectedBrand === brand ? "" : brand));
  };

  const handleColorChange = (e) => {
    const color = e.target.value;
    setSelectedColor((prevSelectedColor) => (prevSelectedColor === color ? "" : color));
  };



  const sortProducts = (products, type) => {
    const locale = "uk";

    switch (type) {
      case "alphabetAsc":
        return [...products].sort((a, b) => a.name.localeCompare(b.name, locale));
      case "alphabetDesc":
        return [...products].sort((a, b) => b.name.localeCompare(a.name, locale));
      case "priceAsc":
        return [...products].sort((a, b) => {
          const priceA = parseFloat(a.currentPrice);
          const priceB = parseFloat(b.currentPrice);
          return isNaN(priceA) || priceA === null ? 1 : isNaN(priceB)
          || priceB === null ? -1 : priceA - priceB;
        });
      case "priceDesc":
        return [...products].sort((a, b) => {
          const priceA = parseFloat(a.currentPrice);
          const priceB = parseFloat(b.currentPrice);
          return isNaN(priceA) || priceA === null ? -1 : isNaN(priceB)
          || priceB === null ? 1 : priceB - priceA;
        });
      case "oldestFirst":
        return [...products].sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
      case "newestFirst":
        return [...products].sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
      case "endDate":
        return [...products].sort((a, b) => new Date(a.endDate) - new Date(b.endDate));
      case "percentageFound":
        return products.sort((a, b) => calculateFundsPercentage(a) - calculateFundsPercentage(b));
      case "firstNew":
        return [...products].sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
      case "expirationDate":
        return [...products].sort((a, b) => new Date(a.endDate) - new Date(b.endDate));
      case "lowestBid":
        return [...products].sort((a, b) => a.currentValue - b.currentValue);
      case "highestBid":
        return [...products].sort((a, b) => b.currentValue - a.currentValue);
      default:
        return products;
    }
  };
  
  const calculateFundsPercentage = (item) => {
    const currentValue = parseFloat(item.currentValue) || 0;
    const goal = parseFloat(item.goal) || 1;
    return (currentValue / goal) * 100;
  };
  
  

  return (
    <div className={styles.filtrationWrapper}>
      <div className={styles.subCategoryOptions}>
        <div className={styles.categorySelect}>
          <select className={styles.select} value={selectedValue} onChange={handleChange}>
            {getUniqueList(
              filtersList.filter(({ type }) => type === "category").map(({ name }) => name),
            ).map((selectCategory) => (
              <option key={selectCategory} value={selectCategory}>
                {selectCategory}
              </option>
            ))}
          </select>
        </div>
        
        {selectedValue === "Одяг" && (
        <aside className={styles.filtration}>
          <SortComponent sortType={sortType} setSortType={setSortType} />
          <SliderPrice
            tempSliderValue={tempSliderValue}
            setTempSliderValue={setTempSliderValue}
            applyFilter={applyFilter}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
          />
          <div className={styles.filtrationSelectWrapper}>
            <div className={styles.categoryOptions} />
            <h3 className={styles.filtrationOptions}>Підкатегорія</h3>
            {getUniqueList(
              filtersList
                .filter(({ type }) => type === "subcategory")
                .map(({ name }) => name),
            ).map((subCategory) => (
              <label
                htmlFor={subCategory}
                key={subCategory}
                className={styles.checkboxLabel}
              >
                <input
                  type="checkbox"
                  name={subCategory}
                  checked={selectedSubCategory === subCategory}
                  className={styles.customCheckbox}
                  onChange={() => handleSubCategoryChange({ target: { value: subCategory } })}
                />
                {subCategory}
              </label>
            ))}

            <h3 className={styles.filtrationOptions}>Виробник</h3>
            {getUniqueList(
              filtersList
                .filter(({ type }) => type === "brand")
                .map(({ name }) => name),
            ).map((brand) => (
              <label
                htmlFor={brand}
                key={brand}
                className={styles.checkboxLabel}
              >
                <input
                  type="checkbox"
                  name={brand}
                  checked={selectedBrand === brand}
                  className={styles.customCheckbox}
                  onChange={() => handleBrandChange({ target: { value: brand } })}
                />
                {brand}
              </label>
            ))}

            <h3 className={styles.filtrationOptions}>Колір</h3>
            {getUniqueList(
              filtersList
                .filter(({ type }) => type === "color")
                .map(({ name }) => name),
            ).map((color) => (
              <label
                htmlFor={color}
                key={color}
                className={styles.checkboxLabel}
              >
                <input
                  type="checkbox"
                  name={color}
                  checked={selectedColor === color}
                  className={styles.customCheckbox}
                  onChange={() => handleColorChange({ target: { value: color } })}
                />
                {color}
              </label>
            ))}
          </div>
        </aside>
        )}

        {selectedValue === "Донат" && (
          <div>
            <SortDonateComponent sortType={sortType} setSortType={setSortType} />
          </div>
          
        )}


        {selectedValue === "Благодійний лот" && (
        <SortLotsComponent sortType={sortType} setSortType={setSortType} />
        )}
      </div>
      
  
      {isLoading ? <Spinner /> : <CardList items={sortProducts(items, sortType)} />}

    </div>

  );
}

