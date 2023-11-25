import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import { Cloudinary } from "@cloudinary/url-gen";
// import { NEW_FAVORITES_URL } from "../../../endpoints/endpoints";
import { removeFavorites, addToCart } from "../../../redux/actions/cartActions";
import { counterIncrement, counterDecrement } from "../../../redux/actionsCreators/counterActionsCreators";
import getFavorites from "../../../api/getFavorites";
// import getCart from "../../../api/getCart";
import Button, { FormButton } from "../../button/Button";
import styles from "./Favorites.module.scss";
import DeleteIcon from "../cart/DeleteIcon";

function LoginModal() {
  return (
    <div className={styles.loginModal}>
      Вже в кошику
    </div>
  );
}


function FavoritesItem({ item }) {
  const dispatch = useDispatch();
  // eslint-disable-next-line max-len, no-underscore-dangle
  const isItemInFavorites = useSelector((state) => state.favorites.items.some((favoritesItem) => favoritesItem._id === item._id));
  // eslint-disable-next-line max-len, no-underscore-dangle
  // const isItemInCart = useSelector((state) => state.cart.items.some((cartItem) => cartItem._id === item._id));
  const cartItems = useSelector((state) => state.cart.items);
  // eslint-disable-next-line max-len, no-underscore-dangle
  const isProductInCart2 = cartItems.some((cartItem) => cartItem._id === item._id);

  // window
  const [showLoginModal, setShowLoginModal] = useState(false);
  const timerRef = useRef();
  function promptLogin() {
    setShowLoginModal(true);
    timerRef.current = setTimeout(() => {
      setShowLoginModal(false);
    }, 1000);
  }
  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  }, []);

  const cld = new Cloudinary({
    cloud: { cloudName: "dzaxltnel" },
    url: { secure: true },
  });
  let imageURL;
  if (item.nameCloudinary && item.nameCloudinary.length > 0) {
    const myImage = cld.image(item.nameCloudinary[0]);
    if (myImage) {
      imageURL = myImage.toURL();
    }
  }

  const handleAddFavoritesToCart = async () => {
    try {
      // eslint-disable-next-line max-len, no-underscore-dangle
      const isProductInCart = cartItems.some((cartItem) => cartItem._id === item._id);
      // eslint-disable-next-line max-len, no-underscore-dangle
      console.log(item._id);
      console.log(isProductInCart);

      if (!isProductInCart) {
        await axios
        // eslint-disable-next-line max-len, no-underscore-dangle
          .put(`http://localhost:4000/api/cart/${item._id}`)
          .then((updatedCart) => {
            console.log(updatedCart);
          })
          .catch((err) => {
            console.log(err);
          });
        const currentProducts = JSON.parse(localStorage.getItem("Cart")) || [];
        currentProducts.push(item);
        localStorage.setItem("Cart", JSON.stringify(currentProducts));
        dispatch(addToCart(item));
        dispatch(counterIncrement());

        await axios
          // eslint-disable-next-line max-len, no-underscore-dangle
          .delete(`http://localhost:4000/api/wishlist/${item._id}`)
          .catch((err) => {
            console.log(err);
          });
        // eslint-disable-next-line max-len, no-underscore-dangle
        dispatch(removeFavorites(item._id));
        dispatch(counterDecrement());
      }
      // Тут можна вивести повідомлення, що товар уже є в кошику
    } catch (error) {
      console.error("Помилка під час додавання товару в кошик:", error);
    }
  };


  async function deleteFavoritesFromServer() {
    const cartData = await getFavorites();
    if (cartData.data.products.length !== null) {
      // eslint-disable-next-line no-underscore-dangle
      const idToDelete = item._id ? item._id : item.id;
      // const idToDelete = item._id;
      axios
        .delete(`http://localhost:4000/api/wishlist/${idToDelete}`)
        .catch((err) => {
          console.log(err);
        });
    }
  }

  const handleRemoveFromFavorites = () => {
    if (isItemInFavorites) {
      deleteFavoritesFromServer();
      // eslint-disable-next-line no-underscore-dangle
      dispatch(removeFavorites(item._id));
      dispatch(counterDecrement());
    }
  };
  
   
  return (
    <tbody key={item.id} className={styles.cardItemWrapper}>
      <tr>
        <td>
          <div className={styles.productInfo}>
            <Link to={`/product/${item.itemNo}`}>
              <div className={styles.cardItemImageWrapper}>
                {/* eslint-disable-next-line max-len */}
                <img src={imageURL || item.imageURL} alt={item.name} className={styles.cardItemImage} />
              </div>
            </Link>
            <div className={styles.nameContainer}>
              <p className={styles.name}>{item.name}</p>
              <p className={styles.sku}>
                <span>Код товару:</span>
                {" "}
                {item.itemNo}
              </p>
            </div>
          </div>
        </td>
        <td>
          <div className={styles.cardItemPrice}>
            {item.price || item.currentPrice ? (
              <div>
                {item.price || item.currentPrice}
                {" "}
                грн
              </div>
            ) : "-"}
          </div>
        </td>
        <td>
          {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}
          <div className={!showLoginModal ? styles.button : styles.buttonHidden}>
            <FormButton text="До кошика" padding="10px" onClick={!isProductInCart2 ? handleAddFavoritesToCart : promptLogin} />
          </div>
        </td>
        <td>
          <Button className={styles.buttonDelete} style={{ backgroundColor: "none" }} onClick={() => handleRemoveFromFavorites()}>
            <DeleteIcon />
          </Button>
        </td>
      </tr>
    </tbody>
  );
}

export default FavoritesItem;
