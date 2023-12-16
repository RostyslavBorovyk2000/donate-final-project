import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import { Cloudinary } from "@cloudinary/url-gen";
import PropTypes from "prop-types";
import { removeFavorites, addToCart } from "../../redux/actions/cartActions";
import { counterIncrement, counterDecrement } from "../../redux/actionsCreators/counterActionsCreators";
import getFavorites from "../../api/getFavorites";
import Button, { FormButton } from "../../components/button/Button";
import { NEW_CART_URL, NEW_FAVORITES_URL } from "../../endpoints/endpoints";
import DeleteIcon from "../cart/DeleteIcon";
import styles from "./Favorites.module.scss";

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
  const cartItems = useSelector((state) => state.cart.items);
  // eslint-disable-next-line max-len, no-underscore-dangle
  const isProductInCart = cartItems.some((cartItem) => cartItem._id === item._id);
  const shouldRenderButton = item.category === "Одяг";
  
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
      if (!isProductInCart) {
        await axios
        // eslint-disable-next-line max-len, no-underscore-dangle
          .put(`${NEW_CART_URL}/${item._id}`)
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
          .delete(`${NEW_FAVORITES_URL}/${item._id}`)
          .catch((err) => {
            console.log(err);
          });
        // eslint-disable-next-line max-len, no-underscore-dangle
        dispatch(removeFavorites(item._id));
        dispatch(counterDecrement());
      }
    } catch (error) {
      console.error("Помилка під час додавання товару в кошик:", error);
    }
  };


  async function deleteFavoritesFromServer() {
    const cartData = await getFavorites();
    if (cartData.data.products.length !== null) {
      // eslint-disable-next-line no-underscore-dangle
      const idToDelete = item._id ? item._id : item.id;
      axios
        .delete(`${NEW_FAVORITES_URL}/${idToDelete}`)
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
    <div className={styles.cardItemWrapper}>
      <div className={styles.productInfo}>
        <Link to={`/product/${item.itemNo}`}>
          <div className={styles.cardItemImageWrapper}>
            {/* eslint-disable-next-line max-len */}
            <img src={imageURL || item.imageURL} alt={item.name} className={styles.cardItemImage} />
          </div>
        </Link>
        <div className={styles.nameContainer}>
          <Link to={`/product/${item.itemNo}`}>
            <p className={styles.name}>{item.name}</p>
            <p className={styles.sku}>
              <span>Код товару:</span>
              {" "}
              {item.itemNo}
            </p>
          </Link>
        </div>
      </div>
      <div className={styles.cardItemPriceWrapper}>
        <div className={styles.cardItemPrice}>
          {item.currentPrice ? (
            <div>
              {item.currentPrice}
              {" "}
              грн
            </div>
          ) : "-"}
        </div>
      </div>
      <div className={styles.buttonsWrapper}>
        {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}
        {shouldRenderButton && (
        <div className={!showLoginModal ? styles.button : styles.buttonHidden}>
          <FormButton text="До кошика" padding="10px" onClick={!isProductInCart ? handleAddFavoritesToCart : promptLogin} />
        </div>
        )}
        <div className={styles.quantityButtonWrapper}>
          <Button className={styles.buttonDelete} style={{ backgroundColor: "none" }} onClick={() => handleRemoveFromFavorites()}>
            <DeleteIcon />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default FavoritesItem;

FavoritesItem.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string,
    nameCloudinary: PropTypes.arrayOf(PropTypes.string),
    imageURL: PropTypes.string,
    name: PropTypes.string,
    itemNo: PropTypes.string,
    currentPrice: PropTypes.number,
    cartQuantity: PropTypes.number,
    subcategory: PropTypes.string,
  }).isRequired,
};
