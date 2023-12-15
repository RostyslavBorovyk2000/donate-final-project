import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Cloudinary } from "@cloudinary/url-gen";
import axios from "axios";
import { removeFromCart, updateCartProductQuantity, updateCartItemSize } from "../../redux/actions/cartActions";
import { counterDecrement } from "../../redux/actionsCreators/counterActionsCreators";
import Button from "../../components/button/Button";
import ShoesSelector from "../../components/productView/sizeSelector/ShoesSelector";
import ClothesSelector from "../../components/productView/sizeSelector/ClothesSelector";
import OuterwearSelector from "../../components/productView/sizeSelector/OuterwearSelector";
import { NEW_CART_URL } from "../../endpoints/endpoints";
import QuantityCounter from "../../components/productView/CounterQuantity";
import styles from "./Cart.module.scss";
import DeleteIcon from "./DeleteIcon";


function CartItem({ item }) {
  const [cartIt, setCartIt] = useState(item);
  const dispatch = useDispatch();
  // eslint-disable-next-line max-len, no-underscore-dangle
  const isItemInCart = useSelector((state) => state.cart.items.some((cartItem) => cartItem._id === item._id));
  // const itemInCart = useSelector((state) => state.cart.items);
  const itemsInLSCart = JSON.parse(localStorage.getItem("Cart"));
  // eslint-disable-next-line max-len, no-underscore-dangle
  const isItemInLSCart = itemsInLSCart && itemsInLSCart.some((cartItem) => cartItem._id === item._id);
  const isUserLoggedIn = localStorage.getItem("userLogin");

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

  // async function getCartFromServer() {
  //   try {
  //     const response = await axios.get(NEW_CART_URL);
  //     return response.data;
  //   } catch (err) {
  //     console.error("Помилка при отриманні даних:", err);
  //     return null;
  //   }
  // }

  async function getCartFromServer() {
    if (!isUserLoggedIn) {
      // console.log("Користувач не авторизований.");
      return null;
    }
  
    try {
      const response = await axios.get(NEW_CART_URL);
      return response.data;
    } catch (err) {
      console.error("Помилка при отриманні даних:", err);
      return null;
    }
  }

  // eslint-disable-next-line no-underscore-dangle
  async function deleteCartFromServer() {
    const cartData = await getCartFromServer();

    if (cartData.products.length !== null) {
      // eslint-disable-next-line no-underscore-dangle
      const idToDelete = item._id ? item._id : item.id;
      // const idToDelete = item._id;
      axios
        .delete(`http://localhost:4000/api/cart/${idToDelete}`)
        .catch((err) => {
          console.log(err);
        });
    }
  }

  const handleRemoveFromCart = () => {
    if (isUserLoggedIn) {
      if (isItemInCart) {
        deleteCartFromServer();
        // eslint-disable-next-line no-underscore-dangle
        dispatch(removeFromCart(item._id));
        dispatch(counterDecrement());
      }
    } else if (!isUserLoggedIn) {
      if (isItemInLSCart) {
        const currentProducts = JSON.parse(localStorage.getItem("Cart")) || [];
        // eslint-disable-next-line no-underscore-dangle
        const updatedProducts = currentProducts.filter((product) => product._id !== item._id);
        localStorage.setItem("Cart", JSON.stringify(updatedProducts));
        // eslint-disable-next-line no-underscore-dangle
        dispatch(removeFromCart(item._id));
        dispatch(counterDecrement());
      }
    }
  };

  async function updateCartQuantityOnServer(productId, newQuantity) {
    try {
      const cartData = await getCartFromServer();
      if (cartData && cartData.products) {
        const updatedProducts = cartData.products.map((product) => (
          // eslint-disable-next-line no-underscore-dangle
          product.product._id === productId
            ? { ...product, cartQuantity: newQuantity }
            : product
        ));

        const updatedCart = { products: updatedProducts };

        const response = await axios.put(NEW_CART_URL, updatedCart);
        dispatch(updateCartProductQuantity(productId, newQuantity));
        if (response.data) {
          console.log("Кошик успішно оновлено на сервері.");
        }
      }
    } catch (error) {
      console.error("Помилка при оновленні кошика на сервері:", error);
    }
  }

  const handleChangeQuantity = (change) => {
    const newQuantity = cartIt.cartQuantity + change;
    if (newQuantity >= 1) {
      setCartIt({ ...cartIt, cartQuantity: newQuantity });

      if (!isUserLoggedIn) {
        const currentProducts = JSON.parse(localStorage.getItem("Cart")) || [];
        const updatedProducts = currentProducts.map((p) => {
          // eslint-disable-next-line no-underscore-dangle
          if (p._id === item._id) {
            return { ...p, cartQuantity: newQuantity };
          }
          return p;
        });
        localStorage.setItem("Cart", JSON.stringify(updatedProducts));
      } else {
        // eslint-disable-next-line no-underscore-dangle
        updateCartQuantityOnServer(cartIt._id, newQuantity);
      }
      // eslint-disable-next-line no-underscore-dangle
      dispatch(updateCartProductQuantity(cartIt._id, newQuantity));
    }
  };

  const updateItemSize = async (productId, newSize) => {
    // Оновлення розміру в localStorage
    const currentProducts = JSON.parse(localStorage.getItem("Cart")) || [];
    const updatedProducts = currentProducts.map((product) => {
      // eslint-disable-next-line no-underscore-dangle
      if (product._id === productId) {
        return { ...product, selectedSize: newSize };
      }
      return product;
    });
    localStorage.setItem("Cart", JSON.stringify(updatedProducts));
  
    // Оновлення розміру на сервері
    try {
      const cartData = await getCartFromServer();
      if (cartData && cartData.products) {
        const updatedCartProducts = cartData.products.map((product) => (
          // eslint-disable-next-line no-underscore-dangle
          product.product._id === productId
            ? { ...product, selectedSize: newSize }
            : product
        ));
  
        const updatedCart = { products: updatedCartProducts };
  
        const response = await axios.put(NEW_CART_URL, updatedCart);
        if (response.status === 200) {
          // Оновлення Redux store
          dispatch(updateCartItemSize(productId, newSize));
        }
      }
    } catch (error) {
      console.error("Помилка при оновленні розміру на сервері:", error);
    }
  };

  
  return (
    <div className={styles.cardItemWrapper}>
      <div className={styles.productInfoTablet}>
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
            Ціна:
            {" "}
            {(item.currentPrice * cartIt.cartQuantity).toFixed(2)}
            {" "}
            грн
          </div>
        </div>
      </div>
      <div className={styles.buttonsWrapper}>
        {/* <div className={styles.buttons1}> */}
        {/* eslint-disable-next-line no-underscore-dangle */}
        {(cartIt.subcategory === "Взуття" && <ShoesSelector updateCartItemSize={updateItemSize} id={item._id} />)
        // eslint-disable-next-line no-underscore-dangle
        || ((cartIt.subcategory === "Комплекти форми" || cartIt.subcategory === "Одяг верхній" || cartIt.subcategory === "Термобілизна") && <ClothesSelector updateCartItemSize={updateItemSize} id={item._id} />)
        // eslint-disable-next-line no-underscore-dangle
        || (cartIt.subcategory === "Кепки" && <OuterwearSelector type="cap" updateCartItemSize={updateItemSize} id={item._id} />)
        // eslint-disable-next-line no-underscore-dangle
        || (cartIt.subcategory === "Шапки" && <OuterwearSelector type="hat" updateCartItemSize={updateItemSize} id={item._id} />) || null}
        {/* </div> */}
        {/* <div className={styles.quantityCounterWrapper}> */}
        <QuantityCounter
          quantity={cartIt.cartQuantity}
          handleChangeQuantity={handleChangeQuantity}
        />
        {/* </div> */}
        {/* <div className={styles.buttons2}> */}
        <div className={styles.quantityButtonWrapper}>
          <Button style={{ backgroundColor: "none" }} onClick={() => handleRemoveFromCart()}>
            <DeleteIcon />
          </Button>
        </div>
        {/* </div> */}
      </div>
    </div>
  );
}

export default CartItem;
