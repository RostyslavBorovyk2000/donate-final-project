/* eslint-disable react/no-array-index-key */
/* eslint-disable no-underscore-dangle */
import { useState, useEffect } from "react";
import axios from "axios";
import Article from "./Article";
import Spinner from "../../components/spinner/Spinner";
import { GET_BLOG } from "../../endpoints/endpoints";
import styles from "./Blog.module.scss";


export default function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const responseOne = await axios.get(`${GET_BLOG}/collection-mobile-workshop-92nd-OSHBr`);
        const responseTwo = await axios.get(`${GET_BLOG}/impression-military-GUR`);
        const responseThree = await axios.get(`${GET_BLOG}/breakfast-1-plus-1-about-donation-of-victory`);
  
        const updatedArticles = [responseOne.data, responseTwo.data, responseThree.data];
        setArticles(() => [...updatedArticles]);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchData();
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <ul className={styles.articleListWrapper}>
      {articles.map((article, index) => (
        <Article
          key={index}
          item={article}
        />
      ))}
    </ul>
  );
}
