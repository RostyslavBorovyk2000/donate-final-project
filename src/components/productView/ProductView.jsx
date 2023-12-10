/* eslint-disable react/button-has-type */
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Cloudinary } from "@cloudinary/url-gen";
import QuantityCounter from "./CounterQuantity";
import { setProduct } from "../../redux/actions/productActions";
import ShoesSelector from "./sizeSelector/ShoesSelector";
import ClothesSelector from "./sizeSelector/ClothesSelector";
import OuterwearSelector from "./sizeSelector/OuterwearSelector";
import ProductViewSlider from "./ProductViewSlider";
import TabComponent from "./Tabs";
import { ProgressBar } from "./ProgressBar";
import ShareProducts from "./ShareProducts";
import Button from "../button/Button";
import CountdownTimer from "./CountdownTimer";
import DocumentTitle from "../routes/DocumentTitle";
import styles from "./ProductView.module.scss";
import { addFavorites, addToCart } from "../../redux/actions/cartActions";
import { counterIncrement } from "../../redux/actionsCreators/counterActionsCreators";
import { GET_CUSTOMER } from "../../endpoints/endpoints";
// import { setAuthToken } from "../../redux/actions/authActions";
import heart from "./icons/heart/heart.svg";
import heartFilled from "./icons/heart/heart-filled.svg";

function convertToImgUrl(nameCloudinary) {
  const cld = new Cloudinary({
    cloud: { cloudName: "dzaxltnel" },
    url: { secure: true },
  });
  const myImage = cld.image(`${nameCloudinary}`);
  const imageURL = myImage.toURL();

  return imageURL;
}

function LoginModalBid() {
  return (
    <div className={styles.loginModal}>
      Вашу ставку надіслано. Чекайте на дзвінок менеджера для підтвердження ставки.
    </div>
  );
}

function LoginModal() {
  return (
    <div className={styles.loginModal}>
      Спершу авторизуйтесь
    </div>
  );
}


function ProductView() {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product.product);
  const params = useParams();
  const isItemInFavorites = useSelector((state) => state.favorites.items.some(
    (favItem) => favItem.itemNo === params.itemNo,
  ));

  const progress = product ? ((product.currentValue * 100 / product.goal).toFixed(1)) : 0;
  // const [currentBid, setCurrentBid] = useState(product?.initialPrice || "");
  // console.log(currentBid);
  const [newCurrentBid, setNewCurrentBid] = useState("");
  const [errorInput, setErrorInput] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isInCart, setIsInCart] = useState(false);
  const [isButtonClicked, setButtonClicked] = useState(false);
  const isUserLoggedIn = localStorage.getItem("userLogin") || null;
  const [showLoginModalBid, setShowLoginModalBid] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const timerRef = useRef();

  function promptPurchase() {
    setShowLoginModalBid(true);
    timerRef.current = setTimeout(() => {
      setShowLoginModalBid(false);
    }, 8000);
  }
  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  }, []);

  function promptLogin() {
    setShowLoginModal(true);
    timerRef.current = setTimeout(() => {
      setShowLoginModal(false);
    }, 2000);
  }
  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  }, []);


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/products/${params.itemNo}`,
        );
        const { data } = response;
        const rawDate = new Date(data.date);
        const formattedDate = `${rawDate.getDate()}/${
          rawDate.getMonth() + 1
        }/${rawDate.getFullYear()}`;

        const initialPrice = data.goal;
        dispatch(
          setProduct({
            ...data,
            formattedDate,
            initialPrice,
            images: data.nameCloudinary.map(convertToImgUrl),
            imageURL: convertToImgUrl(data.nameCloudinary[0]),
          }),
        );
        // setCurrentBid(initialPrice);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    if (params.itemNo) {
      fetchProduct();
    }
  }, [dispatch, params.itemNo]);

  if (!product) {
    return <div>Product not found...</div>;
  }

  async function getCustomerFromServer() {
    try {
      const response = await axios.get(GET_CUSTOMER);
      return response.data;
    } catch (err) {
      console.error("Помилка при отриманні даних:", err);
      return null;
    }
  }

  const handleBidClick = async (lot) => {
    if (parseFloat(newCurrentBid) < parseFloat(product.initialPrice)) {
      setErrorInput(
        `Помилка: Запропонована Вами ставка ${newCurrentBid} нижче поточної.`,
      );
      return;
    }
    if (parseFloat(newCurrentBid) > parseFloat(product.initialPrice)) {
      try {
        const cartData = await getCustomerFromServer();

        const { email, telephone, _id: customerId } = cartData;
        const newOrder = {
          products: [],
          customerId,
          email,
          mobile: telephone,
          bid: newCurrentBid,
          lot,
          letterSubject: "Дякуємо за вашу ставку в аукціоні!",
          letterHtml: `<h1> Ви зробили ставку в розмірі ${newCurrentBid} грн в благодійному аукціоні за лот: ${lot}. Чекайте на дзвінок нашого менеджера для підтвердження ставки!</p>`,
        };

        axios
          .post("http://localhost:4000/api/orders", newOrder)
          .then((response) => {
            if (response.status === 200) {
              promptPurchase();
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        // !
        // setShowError(true);
        console.error("Помилка при вході:", error);
      }
      // setCurrentBid(newCurrentBid);
      setNewCurrentBid("");
      setErrorInput("");
    }
  };

  // function sendCartToEmptyServer() {
  //   const token = localStorage.getItem("token");
  //   store.dispatch(setAuthToken(token));
  
  //   const newCart = {
  //     products: selectCartForApi(state),
  //   };
  
  //   axios
  //     .post(NEW_CART_URL, newCart)
  //     .then(null)
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }

  // !
  const handleAddFavorites = () => {
    let countProducts = JSON.parse(localStorage.getItem("CountFavoritesProducts")) || 0;

    if (!isItemInFavorites) {
      const currentProducts = JSON.parse(localStorage.getItem("Favorites")) || [];
      currentProducts.push(product);
      countProducts += 1;
      localStorage.setItem("Favorites", JSON.stringify(currentProducts));
      localStorage.setItem(
        "CountFavoritesProducts",
        JSON.stringify(countProducts),
      );

      console.log(product);

      dispatch(addFavorites(product));
      dispatch(counterIncrement());
    }
    setButtonClicked(true);
  };

  const handleAddToCart = () => {
    const productWithQuantity = {
      ...product,
      quantity,
    };

    dispatch(addToCart(productWithQuantity));
    setQuantity(1);

    setIsInCart(true);
  };

  return (
    <section style={{ padding: "50px 15px 100px" }}>
      <DocumentTitle title={`${product.shortName} | Донат Перемоги`} />

      <div className={styles.productViewCard}>
        <div className={styles.mainInfoDescription}>
          <ProductViewSlider images={product.images} />
          <div className={styles.productDetails}>
            <h2 className={styles.productName}>{product.name}</h2>
            <p className={styles.productShortName}>{product.shortName}</p>
            {product.category === "Донат" ? (
              <>
                <div className={styles.donateInfo}>
                  <p className={styles.donateInfoLabel}>Зібрано</p>
                  <div className={styles.donateInfoAmount}>
                    <p className={styles.donateInfoResult}>
                      {" "}
                      {/* {(product.goal * progress) / 100} */}
                      {product.currentValue}
                      {" "}
                      грн
                    </p>
                    <p className={styles.donateInfoGoal}>
                      /
                      {" "}
                      {product.goal}
                      {" "}
                      грн
                    </p>
                  </div>
                </div>
                <div className={styles.donateInfoTimer}>
                  <span className={styles.donateInfoDetails}>
                    До кінця збору:
                    {" "}
                  </span>
                  <span className={styles.timer}>
                    {" "}
                    <CountdownTimer targetDate={product.deadline} />
                  </span>
                </div>
              </>
            ) : null}
            {product.category === "Донат" ? (
              <ProgressBar progress={progress} />
            ) : null}
            {product.category === "Благодійний лот" ? (
              <div className={styles.lotDescContainer}>
                <div className={styles.lotDetails}>
                  <div className={styles.lotInfo}>
                    <span className={styles.lotInfoDetails}>Номер лоту: </span>
                    <span>{product.itemNo}</span>
                  </div>
                  <div className={styles.lotInfo}>
                    <span className={styles.lotInfoDetails}>
                      До закриття лоту:
                      {" "}
                    </span>
                    <span className={styles.timer}>
                      {" "}
                      <CountdownTimer targetDate={product.deadline} />
                    </span>
                  </div>
                  <div className={styles.lotInfo}>
                    <span className={styles.lotInfoDetails}>
                      Стартова ціна:
                      {" "}
                    </span>
                    <span>
                      {product.initialPrice}
                      {" "}
                      грн
                    </span>
                  </div>
                  <div className={styles.lotInfo}>
                    <span className={styles.lotInfoDetails}>
                      Поточна ціна:
                      {" "}
                    </span>
                    <span>
                      {/* {currentBid} */}
                      {product.currentValue}
                      {" "}
                      грн
                    </span>
                  </div>
                  <div className={styles.lotInfo}>
                    <span className={styles.lotInfoDetails}>Автор: </span>
                    <span>{product.author}</span>
                  </div>
                </div>

                <div className={styles.descriptionOfProduct}>
                  <h3 style={{ marginBottom: "10px" }}>Опис</h3>
                  <p className={styles.descriptionText}>
                    {" "}
                    {product.description}
                  </p>
                </div>
              </div>
            ) : null}

            {(product.category === "Одяг" && (
              <p className={styles.productPrice}>
                {product.currentPrice}
                {" "}
                грн.
              </p>
            ))}
            {/* // || ((product.category ==="Комплекти форми"
            //   || product.category === "Одяг верхній") && (
            //   <p className={styles.productPrice}>
            //     {product.currentPrice}
            //     {" "}
            //     грн.
            //   </p>
            // ))
            // || null} */}

            {["Одяг"].includes(
              product.category,
            ) && (
              <>
                <p className={styles.descTitle}>Короткий опис:</p>
                <p className={styles.descriptionText}>
                  {product.shortDescription}
                </p>
              </>
            )}

            {(product.subcategory === "Взуття" && <ShoesSelector />)
              || ((product.subcategory === "Комплекти форми"
                || product.subcategory === "Одяг верхній" || product.subcategory === "Термобілизна") && <ClothesSelector />) || (product.subcategory === "Кепки" && <OuterwearSelector type="cap" />) || (product.subcategory === "Шапки" && <OuterwearSelector type="hat" />)
              || null}

            {(product.category === "Взуття" && (
              <QuantityCounter quantity={quantity} setQuantity={setQuantity} />
            ))
              || ((product.category === "Комплекти форми"
                || product.category === "Одяг верхній") && (
                <QuantityCounter
                  quantity={quantity}
                  setQuantity={setQuantity}
                />
              ))
              || null}

            {["Взуття", "Комплекти форми", "Одяг верхній"].includes(
              product.category,
            ) && (
              <div className={styles.buyButtons}>
                {/* // <button */}
                {/* //   className={styles.buyNowBtn}
              //   onClick={() => { dispatch(openModal()); }}
              // >
              //   Миттєва купівля
              // </button> */}
                {/* // <Button */}
                {/* //    text="Додати в кошик"
              // {/*    color="rgba(70, 163, 88, 1)" */}
                {/* //    toPage="/" */}
                {/* // /> */}
                {/* // <button className={styles.addToCartBtn}>Додати в кошик</button> */}
                {/* // <button className={styles.addToFavorite}> */}
                {/* //   <img src={heart} alt="add to favorite" /> */}
                <Button
                  className={styles.addToCartBtn}
                  onClick={handleAddToCart}
                >
                  {isInCart ? "В Кошику" : "Купити"}
                </Button>
                <button
                  className={styles.addToFavorite}
                  onClick={handleAddFavorites}
                >
                  {isButtonClicked ? (
                    <img src={heartFilled} alt="heartIcon" />
                  ) : (
                    <img src={heart} alt="heartIcon" />
                  )}
                </button>
              </div>
            )}

            {["Взуття", "Комплекти форми", "Одяг верхній"].includes(
              product.category,
            ) && (
              <>
                <p className={styles.sku}>
                  <span>Код товару:</span>
                  {" "}
                  {product.itemNo}
                </p>
                <p className={styles.categories}>
                  <span>Категорії: </span>
                  {product.category}
                </p>
                <p className={styles.productColors}>
                  <span>Колір: </span>
                  {product.color}
                </p>
                <ShareProducts />
              </>
            )}

            {product.category === "Донат" ? (
              <div className={styles.descTitle}>
                <h3 style={{ marginBottom: "10px" }}>Опис</h3>
                <p className={styles.descriptionText}>
                  {" "}
                  {product.description}
                </p>
              </div>
            ) : null}

            {product.category === "Благодійний лот" ? (
              <>
                <div className={styles.rateContainer}>
                  <input
                    placeholder="Ваша ставка"
                    className={styles.lotRate}
                    value={newCurrentBid}
                    onChange={(e) => setNewCurrentBid(e.target.value)}
                  />
                  {errorInput && (
                    <div style={{ color: "red", fontSize: "15px" }}>
                      {errorInput}
                    </div>
                  )}
                </div>
                <div className={styles.rateUpBtnWrapper}>
                  { showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} /> }
                  {/* eslint-disable-next-line max-len */}
                  { showLoginModalBid && <LoginModalBid onClose={() => setShowLoginModalBid(false)} /> }
                  {!showLoginModalBid && !showLoginModal
                    ? <Button text="Підняти ставку" onClick={isUserLoggedIn ? () => handleBidClick(product.name) : promptLogin} />
                    : <Button className={styles.hidden} />}
                  {/* {!showLoginModal
                    ? <Button text="Підняти ставку" onClick={() => handleBidClick(product.name)} />
                  : <Button text="Підняти ставку" onClick={() => handleBidClick(product.name)}
                  className={styles.hidden} />} */}
                  <ShareProducts />
                </div>
              </>
            ) : null}

            {product.category === "Донат" ? (
              <div className={styles.donateBtnContainer}>
                <Button text="Підтримати проект" />
                <ShareProducts />
              </div>
            ) : null}
          </div>
        </div>

        {["Взуття", "Комплекти форми", "Одяг верхній"].includes(
          product.category,
        ) && (
          <div className={styles.descriptionContainer}>
            <TabComponent productDescription={product.description} />
          </div>
        )}

        {/* {isModalOpen && (
          <Modal tittle="Ми раді повідомити, що ви успішно купили товар" />
        )} */}
      </div>
    </section>
  );
}

export default ProductView;
