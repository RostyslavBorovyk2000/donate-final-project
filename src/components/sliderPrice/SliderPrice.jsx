import React from "react";
import Slider from "react-slider";
import PropTypes from "prop-types";
import styles from "./SliderPrice.module.scss";


export default function SliderPrice({ tempSliderValue, setTempSliderValue, applyFilter }) {
  const handleInputChange = (index, value) => {
    const newValues = [...tempSliderValue];
    newValues[index] = Number(value);
    setTempSliderValue(newValues);
  };

  return (
    <div className={styles.filtrationSliderSection}>
      <div className={styles.filtrationSliderWrapper}>
        <h3 className={styles.filtrationSliderText}>Ціна, грн</h3>
        <div className={styles.pricesValueWrapper}>
          <input type="number" name="priceValue1" value={tempSliderValue[0]} className={styles.inputPriveValue} onChange={(e) => handleInputChange(0, e.target.value)} />
          <i className={styles.dashBeforeInput} />
          <input style={{ marginRight: "5px" }} type="number" name="priceValue2" value={tempSliderValue[1]} className={styles.inputPriveValue} onChange={(e) => handleInputChange(1, e.target.value)} />
          <button type="submit" className={styles.btnSubmit} onClick={applyFilter}>
            <span className={styles.btnContent}>OK</span>
          </button>
        </div>
        <Slider
          className={styles.slider}
          thumbClassName={styles.thumb}
          trackClassName={styles.track}
          value={tempSliderValue}
          onChange={(value) => setTempSliderValue(value)}
          min={100}
          max={10000}
          pearling
          minDistance={5}
        />
        
      </div>
      
    </div>
  );
}

SliderPrice.propTypes = {
  tempSliderValue: PropTypes.arrayOf(PropTypes.number),
  setTempSliderValue: PropTypes.func.isRequired,
  applyFilter: PropTypes.func.isRequired,
};
