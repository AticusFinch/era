import styles from "./pageUnderConstruction.module.css";
import Image from "next/image";
import Container from "@/app/components/container";

const PageUnderConstruction = () => {
  return (
    <div className={styles.pageUnderConstruction}>
      <Container>
        <div className={styles.pageUnderConstruction_container}>
          <div className={styles.pageUnderConstruction_text}>
            <h1 className={styles.pageUnderConstruction_title}>
              Page Under Construction
            </h1>
            <p className={styles.pageUnderConstruction_subtitle}>
              This page is currently under construction. We are working on
              something great for you.
            </p>
          </div>
          <div className={styles.pageUnderConstruction_image_container}>
            <div className={styles.pageUnderConstruction_image}>
              <Image
                src="/img/under.png"
                alt="Page Under Construction"
                width={3200}
                height={1792}
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default PageUnderConstruction;
