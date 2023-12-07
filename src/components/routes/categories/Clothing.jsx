/* eslint-disable max-len */
import React, { useState } from "react";
import FilteredCardList from "../../cardlists/FilteredCardList";
import SliderPrice from "../../sliderPrice/SliderPrice";
import Pagination  from "../../pagination/Pagination";
import styles from "./Categories.module.scss";


export default function Clothing() {
  const [sliderValue, setSliderValue] = useState([0, 10000]);
  const [tempSliderValue, setTempSliderValue] = useState([0, 10000]);


//   const [coods, setCoods] = useState([]);

// useEffect(() => {
//     const getGoods = async () => {
//         try {
//             const res = await axios.get("http://localhost:4000/api/products");
//             const filteredCoods = res.data.filter(item => item.category === "Одяг");
//             setCoods(filteredCoods);
//         } catch (error) {
//             console.error("Error fetching data:", error);
//         }
//     };

//     getGoods();
// }, []);


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

      <FilteredCardList property="category" value={["Взуття", "Комплекти форми", "Одяг верхній"]} priceRange={sliderValue} />
      <Pagination query='Одяг' />
    </section>
  );
}

