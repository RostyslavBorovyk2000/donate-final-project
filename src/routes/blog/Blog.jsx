import ArticleList from "./ArticleList";
import DocumentTitle from "../DocumentTitle";
import styles from "./Blog.module.scss";

function Blog() {
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
