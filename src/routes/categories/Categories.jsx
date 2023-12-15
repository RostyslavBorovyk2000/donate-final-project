import pic from "../../images/bet-on-victory-ban-2.jpeg";
import AllCategoriesCardList from "../../components/cardlists/AllCategoriesCardList";
// import Pagination from "../../pagination/Pagination";
import styles from "./Categories.module.scss";


export default function Categories() {
  return (
    <section className={styles.cardsSectionWrapper}>
      <h1 className={styles.cardsSectionHeadline}>Категорії</h1>
      <p className={styles.cardsSectionText}>Всі донати, відкриті аукціони та військовий одяг</p>
      
      <AllCategoriesCardList query="" />

      {/* <AllCategoriesCardList /> */}

      {/* <Pagination query="" /> */}

      <div className={styles.pictureWrapper}>
        <img src={pic} alt="alt" className={styles.picture} />
      </div>
    </section>
  );
}
