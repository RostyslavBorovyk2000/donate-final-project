/* eslint-disable react/no-array-index-key */
/* eslint-disable no-underscore-dangle */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import { setArticle } from "../../../redux/actions/articleActions";
import styles from "./Blog.module.scss";


export default function ArticleView() {
  const dispatch = useDispatch();
  const article = useSelector((state) => state.article.article);
  const params = useParams();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/pages/${params.customId}`,
        );
        const { data } = response;
        dispatch(setArticle(data));
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchArticle();
  }, [dispatch, params.customId]);

  return (
    <section style={{ padding: "50px 15px 100px" }}>
      {/* <DocumentTitle title={`${product.shortName} | Донат Перемоги`} /> */}

      <div className={styles.productViewCard}>
        <h1>{article.title}</h1>
        <p>{article.content}</p>
      </div>
    </section>
  );
}
