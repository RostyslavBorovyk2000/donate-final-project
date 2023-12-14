/* eslint-disable react/no-array-index-key */
/* eslint-disable no-underscore-dangle */
// import PropTypes from "prop-types";
// import { useState, useEffect } from "react";
// import { useState, useEffect, useMemo } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Article from "./Article";
import styles from "./Blog.module.scss";


export default function ArticleList() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseOne = await axios.get("http://localhost:4000/api/pages/some-name-1");
        const responseTwo = await axios.get("http://localhost:4000/api/pages/some-name-2");
        const responseThree = await axios.get("http://localhost:4000/api/pages/some-name-3");
  
        const updatedArticles = [responseOne.data, responseTwo.data, responseThree.data];
        setArticles((prevArticles) => [prevArticles, ...updatedArticles]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, []);

  return (
    <ul className={styles.articleListWrapper}>
      <p>Cтатті</p>
      {articles.map((article, index) => (
        <Article
          key={index}
          item={article}
        />
      ))}
    </ul>
  );
}
