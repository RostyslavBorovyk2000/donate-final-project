import PropTypes from "prop-types";
import { Card } from "../card/Card";
import Spinner from "../spinner/Spinner";
import styles from "./PaginationCard.module.scss";

function PaginationCard({ coods, loading }) {
  if (loading) {
    return <Spinner />;
  }

  return (
    <ul className={styles.listCoods}>
      {coods.map((cood, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <div className={styles.listCoodsIteam} key={index}>
          <Card item={cood} />
        </div>
      ))}
    </ul>
  );
}

export default PaginationCard;

PaginationCard.propTypes = {
  loading: PropTypes.bool.isRequired,
  coods: PropTypes.arrayOf.isRequired,
};
