import React from "react";
import { useDispatch, useSelector } from "react-redux";
import FavoritesItem from "./FavoritesItem";
import { FormButton } from "../../button/Button";
// import { openModal } from "../../../redux/actionsCreators/modalActionsCreators";
// import Modal from "../../modal/Modal";
import getFavorites from "../../../api/getFavorites";
import { initializeCart, resetFavorites } from "../../../redux/actions/cartActions";
import updateCart from "../../../api/updateCart";
import { deleteWishlist } from "../../../api/updateFavorites";
import styles from "./Favorites.module.scss";


function Favorites() {
  const favoritesItems = useSelector((state) => state.favorites.items);
  const isFavoriteEmpty = favoritesItems.length === 0;
  const cartLSItems = JSON.parse(localStorage.getItem("Cart")) || [];
  // const favoritesLSItems = JSON.parse(localStorage.getItem("Favorites")) || [];
  const dispatch = useDispatch();

  // let modalText = "";
  // if (!cartItems) {
  //   modalText = "Ви успішно замовили товар! Дякуємо за вашу покупку.
  // Незабаром ми з вами зв'яжемось для підтвердження деталей доставки та оплати. Гарного дня!";
  // } else {
  //   modalText = "Здається, ви забули вибрати товар для покупки.
  // Будь ласка, оберіть товар, який вас цікавить, і натисніть 'Купити'.";
  // }
  
  const handleAddFavoritesToCart = async () => {
    try {
      const serverFavorites = await getFavorites();

      const updatedProducts = serverFavorites.data.products.map((i) => ({
        ...i,
        cartQuantity: i.cartQuantity,
      }));
      const serverCartItems = [];
      serverCartItems.push(...updatedProducts);
      const updatedCartItems = [...cartLSItems, ...serverCartItems];
      localStorage.setItem("Cart", JSON.stringify(updatedCartItems));
      dispatch(initializeCart(updatedCartItems));
      await updateCart(updatedCartItems);
      // cleaning after add
      localStorage.setItem("Favorites", JSON.stringify([]));
      dispatch(resetFavorites());
      deleteWishlist();
    } catch (error) {
      console.error("Помилка під час отримання обраного вибору:", error);
    }
  };
  
  // const handleAddFavoritesToCart = () => {
  //   // TODO
  //   const serverFavorites = await getFavorites();
  //   console.log("!");
  // };

  return (
    <div className={styles.cardsSectionWrapper}>
      <h1 className={styles.cardsSectionHeadline}>Обрані товари</h1>
      <p className={styles.cardsSectionText}>Ваші обрані товари</p>

      {isFavoriteEmpty ? <p className={styles.favoriteEmpty}>Ви ще не додали жодного товару</p>
        : (
          // <ul className={styles.cardsListWrapper}>
          //   {cartItems.map((item) => ( // І тут рендеримо використовуючи cartItems з Redux store
          <table className={styles.cardsListWrapper}>
            <thead>
              <tr className={styles.tableRow}>
                <th>Продукти</th>
                <th>Ціна</th>
              </tr>
            </thead>
            {/* {currentProducts.map((item) => ( */}
            {favoritesItems.map((item) => (
              <FavoritesItem
                key={item.itemNo}
                item={item}
              />
            ))}
          </table>
        )}
      {/* {isModalOpen && (
        <Modal tittle={modalText} />
      )} */}
      <FormButton text="До кошика" padding="10px" onClick={handleAddFavoritesToCart} />
      {/* <FormButton text="Купити" padding="10px" /> */}
    </div>
  );
}

export default Favorites;

