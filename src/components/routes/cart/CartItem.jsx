import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Cloudinary } from "@cloudinary/url-gen";
import axios from "axios";
import { removeFromCart } from "../../../redux/actions/cartActions";
// import { removeFromCart, updateCartProduct } from "../../../redux/actions/cartActions";
import { counterDecrement } from "../../../redux/actionsCreators/counterActionsCreators";
import Button from "../../button/Button";
import { NEW_CART_URL } from "../../../endpoints/endpoints";
// import QuantityCounter from "../../productView/CounterQuantity";
import styles from "./Cart.module.scss";
import DeleteIcon from "./DeleteIcon";


function CartItem({ item }) {
  const dispatch = useDispatch();
  // eslint-disable-next-line max-len
  const isItemInCart = useSelector((state) => state.cart.items.some((cartItem) => cartItem.itemNo === item.itemNo));
  // const itemInCart = useSelector((state) => state.cart.itemCount);
  const itemsInLSCart = JSON.parse(localStorage.getItem("Cart"));
  // eslint-disable-next-line max-len
  const isItemInLSCart = itemsInLSCart && itemsInLSCart.some((cartItem) => cartItem.itemNo === item.itemNo);
  // eslint-disable-next-line max-len
  // const isItemInLSCart = itemsInLSCart((cartItem) => cartItem.itemNo === item.itemNo);
  // console.log(isItemInLSCart);
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
  
  if (!imageURL) {
    imageURL = item.imageURL;
  }

  async function getCartFromServer() {
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
      axios
        .delete(`http://localhost:4000/api/cart/${idToDelete}`)
        // .then((updatedCart) => {
        //   console.log(updatedCart);
        // })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  // const itemInCart = useSelector(
  //   (state) => state.cart.items.find((cartItem) => cartItem.itemNo === item.itemNo),
  // );
  
  const handleRemoveFromCart = () => {
    if (isUserLoggedIn) {
      if (isItemInCart) {
        // let countProducts = JSON.parse(localStorage.getItem("CountCartProducts")) || 0;
        // countProducts -= 1;
        // localStorage.setItem("CountCartProducts", JSON.stringify(countProducts));
      
        // const currentProducts = JSON.parse(localStorage.getItem("Cart")) || [];
        // eslint-disable-next-line max-len
        // const newProducts = currentProducts.filter((cartItem) => cartItem.itemNo !== item.itemNo);
        // localStorage.setItem("Cart", JSON.stringify(newProducts));

        deleteCartFromServer();
      
        dispatch(removeFromCart(item.itemNo));
        dispatch(counterDecrement());
      }
    } else if (!isUserLoggedIn) {
      if (isItemInLSCart) {
        const currentProducts = JSON.parse(localStorage.getItem("Cart")) || [];
        currentProducts.push(item);
        localStorage.setItem("Cart", JSON.stringify(currentProducts));

        dispatch(removeFromCart(item.itemNo));
        dispatch(counterDecrement());
      }
    }
  };

  // const handleChangeQuantity = (quantity) => {
  //   dispatch(updateCartProduct({ quantity, itemNo: item.itemNo }));
  //   const currentProducts = JSON.parse(localStorage.getItem("Cart")) || [];

  //   localStorage.setItem("Cart", JSON.stringify(currentProducts.map((product) => {
  //     if (product.itemNo === item.itemNo) {
  //       return { ...product, quantity };
  //     }

  //     return product;
  //   })));
  // };
  
  return (
    <tr className={styles.cardItemWrapper}>
      <td className={styles.productInfo}>
        <Link to={`/product/${item.itemNo}`}>
          <div className={styles.cardItemImageWrapper}>
            <img src={imageURL || item.imageURL} alt={item.name} className={styles.cardItemImage} />
          </div>
        </Link>
        <div className={styles.nameContainer}>
          <p className={styles.name}>{item.shortName}</p>
          <p className={styles.sku}>
            <span>Код товару:</span>
            {" "}
            {item.itemNo}
          </p>
        </div>
      </td>
      <td className={styles.cardItemPrice}>
        {item.currentPrice}
        грн
      </td>
      <td>
        <div className={styles.quantityCounterWrapper}>
          {/* <QuantityCounter quantity={itemInCart.quantity}
          setQuantity={handleChangeQuantity} /> */}
        </div>
      </td>
      <td>
        <Button style={{ backgroundColor: "none" }} onClick={() => handleRemoveFromCart()}>
          <DeleteIcon />
        </Button>
      </td>
    </tr>
  );
}

export default CartItem;
