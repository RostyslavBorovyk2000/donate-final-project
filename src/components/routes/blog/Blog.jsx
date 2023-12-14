/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
// import { useEffect } from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DocumentTitle from "../DocumentTitle";
import styles from "./Blog.module.scss";
// import { GET_PRODUCTS_URL } from "../../../endpoints/endpoints";

function Blog() {
  const { customId } = useParams();
  const [blogData, setBlogData] = useState([]);
  // const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (customId && customId !== "blog") {
          const response = await axios.get(`http://localhost:4000/api/pages/blog/${customId}`);
          setBlogData(response.data);
        }
      } catch (error) {
        console.error("Помилка отримання даних для блогу:", error);
      }
    };
    console.log(customId);
    fetchData();
  }, [customId]);

  // useEffect(() => {
  //   const getProducts = async () => {
  //     try {
  //       const response = await axios.get(GET_PRODUCTS_URL);
  //       setProducts(response.data);
  //     } catch (error) {
  //       console.error("Error get products:", error);
  //     }
  //   };

  //   getProducts();
  // }, []);


  return (
    <section className={styles.sectionWrapper}>
      <DocumentTitle title="Блог: новини, звіти, статті" />
      <h1 data-testid="blog-test" className={styles.cardsSectionHeadline}>Новини</h1>
      <p className={styles.cardsSectionText}>Новини, звіти, статті</p>

      {/* <ul>
        <li>{products.length}</li>
      </ul>

      <ul className={styles.showList}>
        {products.map((donation) => (
          // eslint-disable-next-line no-underscore-dangle
          <li className={styles.list} key={donation._id}>
            <strong>{donation.name}</strong>
          </li>
        ))}
      </ul> */}

      <ul>
        {blogData.length > 0 ? (
          blogData.map((item) => (
          // eslint-disable-next-line no-underscore-dangle
            <li key={item._id}>
              <h2>{item.title}</h2>
              <p>{item.htmlContent}</p>
            </li>
          ))
        ) : (
          <p>No data available</p>
        )}
      </ul>


    </section>
  );
}

export default Blog;
