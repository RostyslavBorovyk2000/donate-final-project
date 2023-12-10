/* eslint-disable max-len */
import React, { useState } from "react";
import FilteredCardList from "../../cardlists/FilteredCardList";
import SliderPrice from "../../sliderPrice/SliderPrice";
import styles from "./Categories.module.scss";



export default function Clothing() {
  const [sliderValue, setSliderValue] = useState([100, 10000]);
  const [tempSliderValue, setTempSliderValue] = useState([100, 10000]);



  const applyFilter = () => {
    setSliderValue(tempSliderValue);
  };
  
  return (
    <section className={styles.cardsSectionWrapper}>
      <h1 className={styles.cardsSectionHeadline}>Військовий одяг</h1>
      <p className={styles.cardsSectionText}>Військовий одяг на продаж</p>
      <div className={styles.filtration}>
        <SliderPrice tempSliderValue={tempSliderValue} setTempSliderValue={setTempSliderValue} applyFilter={applyFilter} />
      </div>

      <FilteredCardList property="category" value={["Одяг"]} priceRange={sliderValue} />

    </section>
  );
}

