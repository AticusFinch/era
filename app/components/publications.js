"use client";

import styles from "./publications.module.css";
import Container from "@/app/components/container";
import { motion } from "framer-motion";
import Image from "next/image";
import Button from "@/app/components/button";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";

const Publications = ({
  publications = [],
  debugInfo = null,
  showButton = true,
  showAll = false,
}) => {
  // Fallback to empty array if no publications
  const publicationsItems = publications.length > 0 ? publications : [];
  const [isMounted, setIsMounted] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  // Ensure component is mounted and get window width
  useEffect(() => {
    setIsMounted(true);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Set initial width
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  // Determine initial slidesToShow based on window width
  const getInitialSlidesToShow = () => {
    if (typeof window === "undefined" || windowWidth === 0) {
      return 2; // Default to mobile for SSR
    }
    if (windowWidth <= 740) {
      return 2;
    }
    if (windowWidth <= 1024) {
      return 4;
    }
    return 5;
  };

  // Get breakpoint key for forcing re-render
  const getBreakpointKey = () => {
    if (windowWidth === 0) return "mobile";
    if (windowWidth <= 740) return "mobile";
    if (windowWidth <= 1024) return "tablet";
    return "desktop";
  };

  // Simple slick carousel settings
  const sliderSettings = {
    dots: false,
    infinite: !showAll && publicationsItems.length > getInitialSlidesToShow(),
    speed: 500,
    slidesToShow: getInitialSlidesToShow(),
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 740,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div
      className={`${styles.publications} ${
        showAll ? styles.publications_all : ""
      }`}
    >
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
          className={styles.publications_items_wrapper}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {publicationsItems.length > 0 && isMounted ? (
            <Slider
              key={getBreakpointKey()}
              {...sliderSettings}
              className={styles.publications_slider}
            >
              {publicationsItems.map((item, index) => (
                <div
                  key={item.id || index}
                  className={styles.publications_slide}
                >
                  <Link
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
                        download
                      </div>
                    </div>
                    <div className={styles.publications_item_text}>
                      <p className={styles.publications_item_type}>
                        {item.type}
                      </p>
                      <div className={styles.publications_item_title_author}>
                        <h6 className={styles.publications_item_title}>
                          {item.title}
                        </h6>
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
                </div>
              ))}
            </Slider>
          ) : publicationsItems.length > 0 ? (
            <div className={styles.publications_loading}>Loading...</div>
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
        {showButton && (
          <motion.div
            className={styles.publications_button_container}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Button
              href="/our-work/publications"
              className={styles.publications_button}
            >
              Discover More{" "}
              <IoIosArrowForward className={styles.publications_button_icon} />
            </Button>
          </motion.div>
        )}
      </Container>
    </div>
  );
};

export default Publications;
