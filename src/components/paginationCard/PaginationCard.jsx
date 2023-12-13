import { Card } from '../card/Card';
import Spinner from '../spinner/Spinner';
import styles from './PaginationCard.module.scss';

const PaginationCard = ({ coods, loading }) => {
  if (loading) {
    return <Spinner />;
  }

  return (
    <ul className={styles.listCoods}>
      {coods.map((cood, index) => (
        <li className={styles.listCoodsIteam} key={index}>
          <Card item={cood} />
        </li>
      ))}
    </ul>
  );
};

export default PaginationCard