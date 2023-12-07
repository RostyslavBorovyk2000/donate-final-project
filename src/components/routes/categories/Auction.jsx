import FilteredCardList from "../../cardlists/FilteredCardList";
import Pagination from "../../pagination/Pagination";
import styles from "./Categories.module.scss";


export default function Auction() {
  return (
    <section className={styles.cardsSectionWrapper}>
      <h1 className={styles.cardsSectionHeadline}>Лоти аукціону доброчиності</h1>
      <p className={styles.cardsSectionText}>Відкриті аукціони</p>
      <FilteredCardList property="category" value="Благодійний лот" />
      <Pagination query='Благодійний лот' />
    </section>
  );
}
