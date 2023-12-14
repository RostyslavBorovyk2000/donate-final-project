// import { useState, useEffect } from "react";
// import { useEffect } from "react";
// import axios from "axios";
import ArticleList from "./ArticleList";
import DocumentTitle from "../DocumentTitle";
import styles from "./Blog.module.scss";

function Blog() {
  // const [article, setArticle] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:4000/api/pages");
  //       console.log(response);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };
  
  //   fetchData();
  // }, []);

  return (
    <section className={styles.sectionWrapper}>
      <DocumentTitle title="Блог: новини, звіти, статті" />
      <h1 data-testid="blog-test" className={styles.cardsSectionHeadline}>Новини</h1>
      <p className={styles.cardsSectionText}>Новини, звіти, статті</p>

      <ArticleList />
    </section>
  );
}

export default Blog;
