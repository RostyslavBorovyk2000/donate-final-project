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
    <div className={styles.sortOptions}>
      <select name="sortType" value={sortType} onChange={(e) => setSortType(e.target.value)}>
        <option value="firstNew">Спочатку найновіші</option>
        <option value="expirationDate">За датою завершення</option>
        <option value="lowestBid">Від найнижчої ставки</option>
        <option value="highestBid">Від найвищої ставки</option>
      </select>
    </div>
  );
}

export function SortDonateComponent({ sortType, setSortType }) {
  return (
    <div className={styles.sortOptions}>
      <select name="sortType" value={sortType} onChange={(e) => setSortType(e.target.value)}>
        <option value="oldestFirst">Спочатку старі</option>
        <option value="newestFirst">Спочатку нові</option>
        <option value="endDate">За датою завершення</option>
        <option value="percentageFound">За відсотком зібраних коштів</option>
      </select>
    </div>
  );
}


const SortComponents = {
  SortComponent,
  SortLotsComponent,
  SortDonateComponent,
};

export default SortComponents;
