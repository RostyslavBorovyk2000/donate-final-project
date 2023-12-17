/* eslint-disable max-len */
import React, { useState } from "react";
import { useSelector } from "react-redux";
import FilteredCardList from "../../components/cardlists/FilteredCardList";
import { SortComponent } from "../../components/sortComponent/SortComponent";
import SliderPrice from "../../components/sliderPrice/SliderPrice";
import styles from "./Categories.module.scss";


function getUniqueList(list) {
  return [...new Set(list)];
}

export default function Clothing() {
  const [sliderValue, setSliderValue] = useState([100, 10000]);
  const [tempSliderValue, setTempSliderValue] = useState([100, 10000]);
  const filtersList = useSelector((state) => state.filters.items);
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [sortType, setSortType] = useState("default");

  const applyFilter = () => {
    setSliderValue(tempSliderValue);
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

  return (
    <section className={styles.cardsSectionWrapper}>
      <h1 className={styles.cardsSectionHeadline}>Військовий одяг</h1>
      <p className={styles.cardsSectionText}>Військовий одяг на продаж</p>
      <div className={styles.filtration}>
        <div className={styles.categoryOptions}>
          <SortComponent sortType={sortType} setSortType={setSortType} />
          <SliderPrice tempSliderValue={tempSliderValue} setTempSliderValue={setTempSliderValue} applyFilter={applyFilter} />

          <div className={styles.categoryOptionWrapper}>
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
          </div>

          <div className={styles.categoryOptionWrapper}>
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
          </div>

          <div className={styles.categoryOptionWrapper}>
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

        </div>
        {/* <SortComponent sortType={sortType} setSortType={setSortType} /> */}
        <FilteredCardList property="category" value={["Одяг"]} priceRange={sliderValue} subcategory={selectedSubCategory} brand={selectedBrand} color={selectedColor} sortType={sortType} query="Одяг" />
      </div>
    </section>
  );
}

