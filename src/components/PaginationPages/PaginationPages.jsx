import styles from './PaginationPages.module.scss';

const PaginationPages = ({ goodsPearPages , tottalCoods , paginateFunc }) => {
    const numberPages = [];
    for (let i = 1; i <= Math.ceil(tottalCoods / goodsPearPages); i++) {
        numberPages.push(i);
    }
    return (
        <ul className={styles.listNumber}>
            {numberPages.map(number => (
                <li className={styles.iteamNumber} key={number} onClick={() => paginateFunc(number) }>{number}</li>
            ))}
        </ul>
    );
}

export default PaginationPages;