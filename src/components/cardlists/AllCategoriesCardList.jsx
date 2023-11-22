/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CardList from "./CardList";
import SliderPrice from "../sliderPrice/SliderPrice";
import Spinner from "../spinner/Spinner";
import styles from "./AllCategoriesCardList.module.scss";
import { getProducts } from "../../api/getProducts";
import Button from "../button/Button";


function getUniqueList(list) {
  return [...new Set(list)];
}

export default function CategoriesCardList() {
  const [items, setItems] = useState([]);
  const [selectedValue, setSelectedValue] = useState("all");
  const [tempSliderValue, setTempSliderValue] = useState([0, 10000]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSubCategory, setSelectedSubCategory] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState([]);
  const [selectedColor, setSelectedColor] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const productsList = useSelector((state) => state.products.items);
  const filtersList = useSelector((state) => state.filters.items);
  const navigate = useNavigate();


  const applyFilter = () => {
    fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, [selectedValue, selectedSubCategory, selectedBrand,
    selectedColor, selectedStatus, productsList]);

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

    if (tempSliderValue) {
      params.prices = tempSliderValue;
    }
    if (selectedValue === "all") {
      params.category = undefined;
      params.subcategory = undefined;
      params.brand = undefined;
      params.color = undefined;
      params.prices = undefined;
    } else if (selectedValue !== "Одяг") {
      params.category = selectedValue;
      params.subcategory = null;
      params.brand = null;
      params.color = null;
      params.prices = null;
    }
    if (selectedStatus === "Донат") {
      params.status = selectedStatus;
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

  const handleStatusChange = (e) => {
    const status = e.target.value;
    setSelectedStatus(status === selectedStatus ? "all" : status);
  };

  return (
    <div className={styles.filtrationWrapper}>
      <div className={styles.subCategoryOptions}>
        {getUniqueList(
          filtersList.filter(({ type }) => type === "category").map(({ name }) => name),
        ).map((selectCategory) => (
          <Button
            type="button"
            key={selectCategory}
            onClick={() => handleChange({ target: { value: selectCategory } })}
          >
            {selectCategory}
          </Button>
        ))}
        {selectedValue === "Одяг" && (
        <aside className={styles.filtration}>
          <div className={styles.filtrationSelectWrapper}>
            <div className={styles.categoryOptions} />
            <h3>Підкатегорія</h3>
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

            <h3>Виробник/Бренд</h3>
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

            <h3>Колір</h3>
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
            

          <SliderPrice
            tempSliderValue={tempSliderValue}
            setTempSliderValue={setTempSliderValue}
            applyFilter={applyFilter}
          />


        </aside>
        )}
        {selectedValue === "Донат" && (
          <div>
            <select name="status" value={selectedStatus} onChange={handleStatusChange}>
              <option value="all">Усі статуси</option>
              {getUniqueList(
                filtersList
                  .filter(({ type }) => type === "status")
                  .map(({ name }) => name),
              ).map((status) => (
                <option key={status} value={status} className={styles.option}>
                  {status}
                </option>
              ))}
            </select>
            
          </div>
          
        )}
      </div>
      

      {isLoading ? (
        <Spinner />
      ) : (
        <CardList items={items} />
      )}
    </div>

  );
}
