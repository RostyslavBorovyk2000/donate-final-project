import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import { Cloudinary } from "@cloudinary/url-gen";
import { NEW_FAVORITES_URL } from "../../../endpoints/endpoints";
// import QuantityCounter from "../../productView/CounterQuantity";
import { removeFavorites } from "../../../redux/actions/cartActions";
import { counterDecrement } from "../../../redux/actionsCreators/counterActionsCreators";
import Button from "../../button/Button";
import styles from "./Favorites.module.scss";
import DeleteIcon from "../cart/DeleteIcon";



function FavoritesItem({ item }) {
  const dispatch = useDispatch();
  // eslint-disable-next-line max-len, no-underscore-dangle
  const isItemInFavorites = useSelector((state) => state.favorites.items.some((cartItem) => cartItem._id === item._id));
  // const itemsInLSFavorites = JSON.parse(localStorage.getItem("Favorites"));
  // eslint-disable-next-line max-len, no-underscore-dangle
  // const isItemInLSFavorites = itemsInLSFavorites && itemsInLSFavorites.some((cartItem) => cartItem._id === item._id);

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

  async function getFavoritesFromServer() {
    try {
      const response = await axios.get(NEW_FAVORITES_URL);
      return response.data;
    } catch (err) {
      console.error("Помилка при отриманні даних:", err);
      return null;
    }
  }

  async function deleteFavoritesFromServer() {
    const cartData = await getFavoritesFromServer();
    
    if (cartData.products.length !== null) {
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
      // const currentProducts = JSON.parse(localStorage.getItem("Favorites")) || [];
      // const newProducts = currentProducts.filter((cartItem) => cartItem.itemNo !== item.itemNo);
      // localStorage.setItem("Favorites", JSON.stringify(newProducts));

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
                {/* <img src={imageURL} alt={item.name} className={styles.cardItemImage} /> */}
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
          <Button style={{ backgroundColor: "none" }} onClick={() => handleRemoveFromFavorites()}>
            <DeleteIcon />
          </Button>
        </td>
      </tr>
    </tbody>
  );
}

export default FavoritesItem;
