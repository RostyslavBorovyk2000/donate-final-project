/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
/* eslint-disable array-callback-return */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import axios from "axios";
import DocumentTitle from "../DocumentTitle";
import styles from "./Blog.module.scss";
// import { GET_BLOG } from "../../../endpoints/endpoints";

// const articles = [
//   {
//     id: 1,
//     title: "Назва першої статті",
//     content: "Тут текст першої статті про війну...",
//   },
//   {
//     id: 2,
//     title: "Назва другої статті",
//     content: "Тут текст другої статті про війну...",
//   },
//   // Додайте інші статті за аналогією
// ];

function Blog() {
  const [articles, setArticles] = useState([]);
  // const [blog, setBlog] = useState([]);

  // useEffect(() => {
  //   const getBlog = async () => {
  //     try {
  //       const response = await axios.get(GET_BLOG);
  //       setBlog(response.data);
  //     } catch (error) {
  //       console.error("Error get blog:", error);
  //     }
  //   };

  //   getBlog();
  // }, []);

  // eslint-disable-next-line no-shadow

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/Blog.json");
        setArticles(response.json());
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, []);


  return (
    
    <section className={styles.sectionWrapper}>
      <DocumentTitle title="Блог: новини, звіти, статті" />
      <h1 data-testid="blog-test" className={styles.cardsSectionHeadline}>Новини</h1>
      <p className={styles.cardsSectionText}>Новини, звіти, статті</p>

      <h1>Новини</h1>
      <ul>
        {articles.map((article) => (
          <li key={article.id}>
            <h2>{article.title}</h2>
            <p>{article.content}</p>
          </li>
        ))}
      </ul>
      <div>{JSON.stringify(data)}</div>
      {/* <div>
        {blog.map((article) => {
          <div key={article._id}>
            <h2>{article.title}</h2>
            <p>{article.content}</p>
          </div>;
        })}
      </div> */}

      {/* <div className={styles.articlesContainer}>
        {articles.map((article) => (
          <div key={article.id} className={styles.article}>
            <h2>{article.title}</h2>
            <p>{article.content}</p>
          </div>
        ))}
      </div> */}
    </section>
  );
}

export default Blog;
