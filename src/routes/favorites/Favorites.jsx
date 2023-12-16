import React from "react";
import { useSelector } from "react-redux";
import FavoritesItem from "./FavoritesItem";
import styles from "./Favorites.module.scss";


function Favorites() {
  const favoritesItems = useSelector((state) => state.favorites.items);
  const favoritesItemsGoods = favoritesItems.filter((product) => product.category === "Одяг");
  const favoritesItemsNotGoods = favoritesItems.filter((product) => product.category !== "Одяг");
  // const isFavoriteEmpty = favoritesItems.length === 0;

  return (
    <div className={styles.cardsSectionWrapper}>
      <h1 className={styles.cardsSectionHeadline}>Обрані товари</h1>
      <p className={styles.cardsSectionText}>Ваші обрані товари</p>

      {favoritesItemsGoods.length === 0 ? (
        <p className={styles.favoriteEmpty}>Ви ще не додали жодного товару</p>
      ) : (
        <div className={styles.cardsListWrapper}>
          {favoritesItems.map((item) => {
            if (item.category === "Одяг") {
              return (
                <FavoritesItem
                  key={item.itemNo}
                  item={item}
                />
              );
            }
            return null;
          })}
        </div>
      )}
      
      <h2 className={styles.cardsSectionHeadline}>Ви слідкуєте</h2>
      <p className={styles.cardsSectionText}>Лоти та донати</p>
      {favoritesItemsNotGoods.length === 0 ? (
        <p className={styles.favoriteEmpty}>Ви ще не додали жодного лоту чи донат</p>
      ) : (
        <div className={styles.cardsListDonatWrapper}>
          {favoritesItems.map((item) => {
            if (item.category === "Благодійний лот" || item.category === "Донат") {
              return (
                <FavoritesItem
                  key={item.itemNo}
                  item={item}
                />
              );
            }
            return null;
          })}
        </div>
      )}
    </div>
  );
}

export default Favorites;

