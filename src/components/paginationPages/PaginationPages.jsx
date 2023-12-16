import PropTypes from "prop-types";
import styles from "./PaginationPages.module.scss";

function PaginationPages({ goodsPearPages, tottalCoods, paginateFunc }) {
  const numberPages = [];
  for (let i = 1; i <= Math.ceil(tottalCoods / goodsPearPages); i++) {
    numberPages.push(i);
  }

  if (numberPages.length <= 1) {
    return null;
  }
  
  return (
    <ul className={styles.listNumber}>
      {numberPages.map((number) => (
        <a href={`#page-${number}`} className={styles.iteamNumber} key={number} onClick={(e) => { e.preventDefault(); paginateFunc(number); }}>
          {number}
        </a>
      ))}
    </ul>
  );
}

export default PaginationPages;

PaginationPages.propTypes = {
  goodsPearPages: PropTypes.number.isRequired,
  tottalCoods: PropTypes.number.isRequired,
  paginateFunc: PropTypes.func.isRequired,
};
