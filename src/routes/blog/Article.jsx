/* eslint-disable react/no-array-index-key */
/* eslint-disable no-underscore-dangle */
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./Blog.module.scss";


export default function Article({ item }) {
  return (
    <li className={styles.articleItemWrapper}>
      <Link to={`/blog/news/${item.customId}`} className={styles.articleItem}>
        <img src={item.url} alt={item.customId} />
        <p>{item.title}</p>
      </Link>
    </li>
  );
}


Article.propTypes = {
  item: PropTypes.shape({
    customId: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

