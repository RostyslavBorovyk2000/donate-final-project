/* eslint-disable react/no-array-index-key */
/* eslint-disable no-underscore-dangle */
import PropTypes from "prop-types";
import { Card } from "../card/Card";
import styles from "./CardList.module.scss";


export default function CardList({ items, pageIsMain }) {
  return (
    <ul className={pageIsMain !== "true" ? styles.cardsListWrapper : styles.cardsListWrapperMain}>
      {items.map((item) => (
        <Card
          key={item.itemNo}
          item={item}
        />
      ))}
    </ul>
  );
}


CardList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      itemNo: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number,
      nameCloudinary: PropTypes.arrayOf(PropTypes.string).isRequired,
      category: PropTypes.string.isRequired,
    }),
  ).isRequired,
};
