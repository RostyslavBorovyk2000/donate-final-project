import { useState } from "react";
import FilteredCardList from "../../components/cardlists/FilteredCardList";
import { SortLotsComponent } from "../../components/sortComponent/SortComponent";
// import Pagination from "../../pagination/Pagination";
import styles from "./Categories.module.scss";



export default function Auction() {
  const [sortType, setSortType] = useState("default");


  return (
    <section className={styles.cardsSectionWrapper}>
      <h1 className={styles.cardsSectionHeadline}>Лоти аукціону доброчиності</h1>
      <p className={styles.cardsSectionText}>Відкриті аукціони</p>
      <SortLotsComponent sortType={sortType} setSortType={setSortType} />
      <FilteredCardList property="category" value="Благодійний лот" sortType={sortType} query="Благодійний лот" />
      {/* <FilteredCardList property="category" value="Благодійний лот" /> */}
      {/* <Pagination query="Благодійний лот" /> */}
    </section>
  );
}
