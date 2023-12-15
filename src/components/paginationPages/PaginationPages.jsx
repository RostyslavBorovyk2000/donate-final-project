import styles from "./PaginationPages.module.scss";

function PaginationPages({ goodsPearPages, tottalCoods, paginateFunc }) {
  const numberPages = [];
  for (let i = 1; i <= Math.ceil(tottalCoods / goodsPearPages); i++) {
    numberPages.push(i);
  }
  return (
    <ul className={styles.listNumber}>
      {numberPages.map((number) => (
        <button type="button" className={styles.iteamNumber} key={number} onClick={() => paginateFunc(number)}>{number}</button>
      ))}
    </ul>
  );
}

export default PaginationPages;
