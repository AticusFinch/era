import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Container from "../components/container";
import styles from "./page.module.css";
import Link from "next/link";

export default function Resources() {
  return (
    <>
      <Navbar />
      <Container>
        <div className={styles.resources_container}>
          <div className={styles.resources_header}>
            <h1 className={styles.resources_title}>Resources</h1>
            <p className={styles.resources_description}>
              Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque
              faucibus ex sapien vitae pellentesque sem placerat. In id cursus
              mi pretium tellus duis convallis. Tempus leo eu aenean sed diam
              urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum
              egestas.
            </p>
          </div>
          <div className={styles.resources_filters}>
            <ul className={styles.resources_filters_list}>
              <li className={styles.resources_filters_item}>
                <Link
                  href="/resources"
                  className={styles.resources_filters_button}
                >
                  All
                </Link>
              </li>
              <li className={styles.resources_filters_item}>
                <Link
                  href="/resources"
                  className={styles.resources_filters_button}
                >
                  Publications
                </Link>
              </li>
              <li className={styles.resources_filters_item}>
                <Link
                  href="/resources"
                  className={styles.resources_filters_button}
                >
                  Policy Briefs
                </Link>
              </li>
              <li className={styles.resources_filters_item}>
                <Link
                  href="/resources"
                  className={styles.resources_filters_button}
                >
                  Reports
                </Link>
              </li>
              <li className={styles.resources_filters_item}>
                <Link
                  href="/resources"
                  className={styles.resources_filters_button}
                >
                  Toolkits
                </Link>
              </li>
              <li className={styles.resources_filters_item}>
                <Link
                  href="/resources"
                  className={styles.resources_filters_button}
                >
                  Press Releases
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </Container>
      <Footer />
    </>
  );
}
