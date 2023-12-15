import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Card } from "../../components/card/Card";
import { getProducts } from "../../api/getProducts";
import Spinner from "../../components/spinner/Spinner";
import DocumentTitle from "../DocumentTitle";
import styles from "./SearchProducts.module.scss";


function ListProducts() {
  const inputValueFromRedux = useSelector((state) => state.inputValue.inputValue);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getProducts()
      .then((responseData) => {
        setData(responseData);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Помилка при отриманні даних з сервера:", error);
        setIsLoading(false);
      });
  }, [inputValueFromRedux]);

  // eslint-disable-next-line max-len
  const filteredData = data.filter((item) => item.name.toLowerCase().includes(inputValueFromRedux.toLowerCase()));

    
  return (
    <>
      <DocumentTitle title={`Пошук: ${inputValueFromRedux}`} />
            
      <section className={styles.cardsSectionWrapper}>
        <h1 className={styles.cardsSectionHeadline}>Результати пошуку</h1>
        {isLoading ? (
          <Spinner />
        ) : (
          <ul className={styles.cardsListWrapper}>
            {filteredData.length > 0 ? (
              <>
                {filteredData.map((item, index) => (
                  <Card
                    // eslint-disable-next-line react/no-array-index-key
                    key={index}
                    itemNo={item.itemNo}
                    name={item.name}
                    price={item.price}
                    nameCloudinary={item.nameCloudinary[0]}
                    isLot={item.category}
                  />
                ))}
              </>
            ) : (
              <p>На жаль, пошук не дав результату</p>
            )}
          </ul>
        )}
      </section>
    </>
  );
}

export default ListProducts;
