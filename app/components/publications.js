"use client";

import styles from "./publications.module.css";
import Container from "@/app/components/container";
import { motion } from "framer-motion";
import Image from "next/image";
import Button from "@/app/components/button";
import Link from "next/link";

import { BsDownload } from "react-icons/bs";
import { IoIosArrowForward } from "react-icons/io";

const Publications = ({ publications = [], debugInfo = null }) => {
  // Fallback to empty array if no publications
  const publicationsItems = publications.length > 0 ? publications : [];
  return (
    <div className={styles.publications}>
      <Container>
        <motion.h2
          className={`${styles.publications_title} title`}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <span className="title-accent">Publications</span>
        </motion.h2>
        <motion.div
          className={styles.publications_items}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {publicationsItems.length > 0 ? (
            publicationsItems.map((item, index) => (
              <Link
                key={item.id || index}
                href={`/publications/${item.slug}`}
                className={styles.publications_item}
              >
                <div className={styles.publications_item_image}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                  <div
                    className={styles.publications_item_download}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      console.log("Download clicked:", item.downloadUrl);
                      if (item.downloadUrl) {
                        window.open(item.downloadUrl, "_blank");
                      } else {
                        console.warn(
                          "No download URL available for:",
                          item.title
                        );
                      }
                    }}
                  >
                    <BsDownload />
                  </div>
                </div>
                <div className={styles.publications_item_text}>
                  <span className={styles.publications_item_type}>
                    {item.type}
                  </span>
                  <div className={styles.publications_item_title_author}>
                    <h3 className={styles.publications_item_title}>
                      {item.title}
                    </h3>
                    {item.authors && (
                      <div className={styles.publications_item_authors}>
                        {item.authors
                          .split(",")
                          .slice(0, 3)
                          .map((author, authorIndex) => (
                            <p
                              key={authorIndex}
                              className={styles.publications_item_author}
                            >
                              {author.trim()}
                            </p>
                          ))}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div>
              <p>No publications available at the moment.</p>
              {debugInfo && (
                <div
                  style={{
                    marginTop: "1rem",
                    padding: "1rem",
                    background: "#fff3cd",
                    border: "1px solid #ffc107",
                    borderRadius: "4px",
                    fontSize: "0.9rem",
                  }}
                >
                  <strong>Debug Info:</strong>
                  {debugInfo.error && (
                    <p style={{ marginTop: "0.5rem" }}>
                      <strong>Error:</strong> {debugInfo.error}
                    </p>
                  )}
                  {debugInfo.graphQLErrors && (
                    <div style={{ marginTop: "0.5rem" }}>
                      <strong>GraphQL Errors:</strong>
                      <ul>
                        {debugInfo.graphQLErrors.map((err, idx) => (
                          <li key={idx}>{err}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {debugInfo.availableFields && (
                    <div style={{ marginTop: "0.5rem" }}>
                      <strong>Available fields in GraphQL response:</strong>
                      <ul>
                        {debugInfo.availableFields.map((field, idx) => (
                          <li key={idx}>{field}</li>
                        ))}
                      </ul>
                      <p style={{ marginTop: "0.5rem" }}>
                        💡 <strong>Tip:</strong> Your custom post type might be
                        named differently. Common names: "publication",
                        "publicationPosts", or check your WordPress GraphQL
                        schema.
                      </p>
                    </div>
                  )}
                  <p style={{ marginTop: "1rem", fontSize: "0.85rem" }}>
                    Check the browser console (F12) for more details.
                  </p>
                </div>
              )}
            </div>
          )}
        </motion.div>
        <motion.div
          className={styles.publications_button_container}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Button href="/publications" className={styles.publications_button}>
            Discover More{" "}
            <IoIosArrowForward className={styles.publications_button_icon} />
          </Button>
        </motion.div>
      </Container>
    </div>
  );
};

export default Publications;
