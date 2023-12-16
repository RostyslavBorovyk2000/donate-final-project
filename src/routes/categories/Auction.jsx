import { useState } from "react";
import FilteredCardList from "../../components/cardlists/FilteredCardList";
import { SortLotsComponent } from "../../components/sortComponent/SortComponent";
import styles from "./Categories.module.scss";



export default function Auction() {
  const [sortType, setSortType] = useState("default");


  return (
    <section className={styles.cardsSectionWrapper}>
      <h1 className={styles.cardsSectionHeadline}>Лоти аукціону доброчиності</h1>
      <p className={styles.cardsSectionText}>Відкриті аукціони</p>
      <div className={styles.cardSection}>
        <SortLotsComponent sortType={sortType} setSortType={setSortType} />
        <div className={styles.filterSectionWrapper}>
          <FilteredCardList property="category" value="Благодійний лот" sortType={sortType} query="Благодійний лот" />
        </div>
      </div>
    </section>
  );
}
