import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import { Cloudinary } from "@cloudinary/url-gen";
// import { NEW_FAVORITES_URL } from "../../../endpoints/endpoints";
import { removeFavorites } from "../../../redux/actions/cartActions";
import { counterDecrement } from "../../../redux/actionsCreators/counterActionsCreators";
import getFavorites from "../../../api/getFavorites";
import getCart from "../../../api/getCart";
import Button, { FormButton } from "../../button/Button";
import styles from "./Favorites.module.scss";
import DeleteIcon from "../cart/DeleteIcon";



function FavoritesItem({ item }) {
  const dispatch = useDispatch();
  // eslint-disable-next-line max-len, no-underscore-dangle
  const isItemInFavorites = useSelector((state) => state.favorites.items.some((favoritesItem) => favoritesItem._id === item._id));
  // eslint-disable-next-line max-len, no-underscore-dangle
  // const isItemInCart = useSelector((state) => state.cart.items.some((cartItem) => cartItem._id === item._id));
  const cartItems = useSelector((state) => state.cart.items);

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

  // async function getFavoritesFromServer() {
  //   try {
  //     const response = await axios.get(NEW_FAVORITES_URL);
  //     return response.data;
  //   } catch (err) {
  //     console.error("Помилка при отриманні даних:", err);
  //     return null;
  //   }
  // }

  const handleAddFavoritesToCart = async () => {
    try {
      const serverCart = await getCart();
      const serverFavorites = await getFavorites();
      console.log(serverCart);
      // console.log(serverFavorites);
      // console.log(isItemInFavorites);
      // console.log(isItemInCart);

      const updatedProduct = serverFavorites.data.products.map((product) => {
        // eslint-disable-next-line max-len, no-underscore-dangle
        const isProductInCart = cartItems.some((cartItem) => cartItem._id === product._id);

        if (!isProductInCart) {
          return {
            ...product,
            cartQuantity: product.cartQuantity,
          };
        }
        return null;
      }).filter(Boolean);
      console.log(updatedProduct);
        
      // const serverCartItems = [];
      // serverCartItems.push(...updatedProducts);
      // const updatedCartItems = [...cartLSItems, ...serverCartItems];
      // localStorage.setItem("Cart", JSON.stringify(updatedCartItems));
      // dispatch(initializeCart(updatedCartItems));
      // await updateCart(updatedCartItems);
      // // cleaning after add
      // localStorage.setItem("Favorites", JSON.stringify([]));
      // dispatch(resetFavorites());
      // deleteWishlist();
    } catch (error) {
      console.error("Помилка під час отримання обраного вибору:", error);
    }
  };

  async function deleteFavoritesFromServer() {
    const cartData = await getFavorites();
    
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
          <FormButton text="До кошика" padding="10px" onClick={handleAddFavoritesToCart} />
          <Button style={{ backgroundColor: "none" }} onClick={() => handleRemoveFromFavorites()}>
            <DeleteIcon />
          </Button>
        </td>
      </tr>
    </tbody>
  );
}

export default FavoritesItem;
