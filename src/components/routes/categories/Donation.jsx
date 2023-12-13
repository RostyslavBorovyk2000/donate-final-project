/* eslint-disable max-len */
import { useState } from "react";
import FilteredCardList from "../../cardlists/FilteredCardList";
import { SortDonateComponent } from "../../sortComponent/SortComponent";
import styles from "./Categories.module.scss";
// import Pagination from "../../pagination/Pagination";


export default function Donation() {
  const [sortType, setSortType] = useState("default");


  return (
    <section className={styles.cardsSectionWrapper}>
      <h1 className={styles.cardsSectionHeadline}>Донати на ЗСУ</h1>
      <p className={styles.cardsSectionText}>Цільові донати, що направляються на потреби військових підрозділів Збройних Сил України</p>
      <SortDonateComponent sortType={sortType} setSortType={setSortType} />
      <FilteredCardList property="category" value="Донат" sortType={sortType} query="Донат" />
      {/* <FilteredCardList property="category" value="Донат" /> */}
      {/* <Pagination query="Донат" /> */}
    </section>
  );
}
