import React from "react";
import styles from "./SortComponent.module.scss";

export function SortComponent({ sortType, setSortType }) {
  return (
    <div className={styles.sortOptions}>
      <select value={sortType} onChange={(e) => setSortType(e.target.value)}>
        <option value="default">Без сортування</option>
        <option value="alphabetAsc">Алфавіт (А-Я)</option>
        <option value="alphabetDesc">Алфавіт (Я-А)</option>
        <option value="priceAsc">Ціна (за зростанням)</option>
        <option value="priceDesc">Ціна (за спаданням)</option>
      </select>
    </div>
  );
}

export function SortLotsComponent({ sortType, setSortType }) {
  return (
    <div>
      <select name="sortType" value={sortType} onChange={(e) => setSortType(e.target.value)}>
        <option value="newestFirst">Спочатку найновіші</option>
        <option value="endDate">За датою завершення</option>
        <option value="lowestBid">Від найнижчої ставки</option>
        <option value="highestBid">Від найвищої ставки</option>
      </select>
    </div>
  );
}



const SortComponents = {
  SortComponent,
  SortLotsComponent,
};

export default SortComponents;
