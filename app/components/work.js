import styles from "./work.module.css";
import Container from "@/app/components/container";
import Link from "next/link";
import Image from "next/image";

const Work = () => {
  return (
    <div className={styles.work}>
      <Container>
        <div className={styles.work_container}>
          <div className={styles.work_text}>
            <h2 className={`${styles.work_title} title`}>
              <span className="title-accent">Our Work</span>
            </h2>
            <p className={`${styles.work_subtitle} text`}>
              Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque
              faucibus ex sapien vitae pellentesque sem placerat. In id cursus
              mi pretium tellus duis convallis. Tempus leo eu aenean sed diam
              urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum
              egestas.
            </p>
          </div>
          <div className={styles.work_links}>
            <div className={styles.work_link}>
              <div className={styles.work_link_image}>
                <Image
                  src="/img/hero/lgbt.jpg"
                  alt="Projects"
                  width={200}
                  height={200}
                />
              </div>
              <Link href="/our-work/projects">
                <span className={styles.work_link_accent}>Projects</span>
              </Link>
            </div>
            <div className={styles.work_link}>
              <div className={styles.work_link_image}>
                <Image
                  src="/img/hero/lgbt.jpg"
                  alt="Publications"
                  width={200}
                  height={200}
                />
              </div>
              <Link href="/our-work/publications">
                <span className={styles.work_link_accent}>Publications</span>
              </Link>
            </div>
          </div>
        </div>
      </Container>
      <div className={styles.work_images}>
        <div className={styles.work_image_container}>
          <Image
            src="/img/hero/lgbt.jpg"
            alt="Our Work"
            width={1000}
            height={1000}
            priority
          />
        </div>
        <div className={styles.work_image_container}>
          <Image
            src="/img/hero/lgbt.jpg"
            alt="Our Work"
            width={1000}
            height={1000}
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default Work;
