/* eslint-disable react/no-array-index-key */
/* eslint-disable no-underscore-dangle */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import Spinner from "../../components/spinner/Spinner";
import { setArticle } from "../../redux/actions/articleActions";
import styles from "./Blog.module.scss";


export default function ArticleView() {
  const dispatch = useDispatch();
  const article = useSelector((state) => state.article.article);
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:4000/api/pages/${params.customId}`,
        );
        const { data } = response;
        dispatch(setArticle(data));
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticle();
  }, [dispatch, params.customId]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <section style={{ padding: "50px 15px 100px" }} className={styles.articlePageContentWrapper}>
      {/* <DocumentTitle title={`${product.shortName} | Донат Перемоги`} /> */}

      {/* <div className={styles.productViewCard}> */}
      <h1>{article.title}</h1>
      <img src={article.url} alt={article.title} />
      <p>{article.content}</p>
      {/* </div> */}
    </section>
  );
}
