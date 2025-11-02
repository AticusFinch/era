import styles from "./news.module.css";
import Container from "@/app/components/container";

const News = () => {
  return (
    <div className={styles.news}>
      <Container>
        <h2 className={`${styles.news_title} title`}>
          <span className="title-accent">News</span>
        </h2>
      </Container>
    </div>
  );
};

export default News;
