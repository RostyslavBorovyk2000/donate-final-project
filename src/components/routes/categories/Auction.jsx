import FilteredCardList from "../../cardlists/FilteredCardList";
import styles from "./Categories.module.scss";



export default function Auction() {
  return (
    <section className={styles.cardsSectionWrapper}>
      <h1 className={styles.cardsSectionHeadline}>Лоти аукціону доброчиності</h1>
      <p className={styles.cardsSectionText}>Відкриті аукціони</p>
      
      <FilteredCardList property="category" value="Благодійний лот" />
    </section>
  );
}
