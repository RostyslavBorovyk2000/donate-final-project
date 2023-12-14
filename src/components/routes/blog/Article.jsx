/* eslint-disable react/no-array-index-key */
/* eslint-disable no-underscore-dangle */
// import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./Blog.module.scss";


export default function Article({ item }) {
  return (
    <li className={styles.articleItemWrapper}>
      <div className={styles.articleItemContainer}>
        {/* <Link to={`/product/${itemNo}`}>
          <img src={imageURL} className={styles.cardItemImage} alt="My img" />
        </Link> */}
        <Link to={`/blog/news/${item.customId}`}>
          <h2>{item.title}</h2>
        </Link>
        <Link to={`/blog/news/${item.customId}`}>
          <p>{item.content}</p>
        </Link>
      </div>
    </li>
  );
}


// CardList.propTypes = {
//   items: PropTypes.arrayOf(
//     PropTypes.shape({
//       itemNo: PropTypes.string.isRequired,
//       name: PropTypes.string.isRequired,
//       price: PropTypes.number,
//       nameCloudinary: PropTypes.arrayOf(PropTypes.string).isRequired,
//       category: PropTypes.string.isRequired,
//     }),
//   ).isRequired,
// };
