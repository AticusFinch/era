"use client";

import styles from "./publications.module.css";
import Container from "@/app/components/container";
import { motion } from "framer-motion";
import Image from "next/image";
import Button from "@/app/components/button";
import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { useRef, useEffect, useState } from "react";

const Publications = ({
  publications = [],
  debugInfo = null,
  showButton = true,
  showAll = false,
}) => {
  // Fallback to empty array if no publications
  const publicationsItems = publications.length > 0 ? publications : [];
  const sliderRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);

  // Ensure component is mounted before rendering slider (fixes SSR issues)
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Custom arrow components
  const NextArrow = ({ onClick, className, style }) => {
    return (
      <button
        className={`${styles.slick_arrow_next} ${className || ""}`}
        onClick={onClick}
        style={style}
        aria-label="Next slide"
      >
        <IoIosArrowForward />
      </button>
    );
  };

  const PrevArrow = ({ onClick, className, style }) => {
    return (
      <button
        className={`${styles.slick_arrow_prev} ${className || ""}`}
        onClick={onClick}
        style={style}
        aria-label="Previous slide"
      >
        <IoIosArrowBack />
      </button>
    );
  };

  // Slick carousel settings - simple responsive
  // Note: Slick breakpoints are max-width (viewport <= breakpoint)
  // Base applies to viewports > largest breakpoint
  // Breakpoints cascade from largest to smallest
  //
  // How it works:
  // - > 1280px: 5 slides (base)
  // - <= 1280px: 6 slides
  // - <= 1024px: 4 slides (overrides 1280)
  // - <= 740px: 2 slides (overrides 1024)
  const sliderSettings = {
    dots: false,
    infinite: !showAll && publicationsItems.length > 5, // Infinite scroll only on homepage and when enough items
    speed: 500,
    slidesToShow: 5, // Base: 5 slides for > 1280px
    slidesToScroll: 1,
    autoplay: false,
    arrows: publicationsItems.length > 5, // Only show arrows if there are more items than visible
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    adaptiveHeight: false,
    swipe: true,
    touchMove: true,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 6, // <= 1280px: 6 slides
          slidesToScroll: 1,
          arrows: publicationsItems.length > 6,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4, // <= 1024px: 4 slides
          slidesToScroll: 1,
          arrows: publicationsItems.length > 4,
        },
      },
      {
        breakpoint: 740,
        settings: {
          slidesToShow: 2, // <= 740px: 2 slides
          slidesToScroll: 1,
          arrows: false, // Hide arrows on mobile
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
              ref={sliderRef}
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
            <div className={styles.publications_loading}>
              Loading carousel...
            </div>
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
