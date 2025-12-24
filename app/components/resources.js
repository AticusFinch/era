"use client";

import styles from "./resources.module.css";
import Container from "@/app/components/container";
import { motion } from "framer-motion";
import Image from "next/image";
import Button from "@/app/components/button";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useState, useCallback } from "react";

const Resources = ({
  resources = [],
  debugInfo = null,
  showButton = true,
  showAll = false,
}) => {
  // Fallback to empty array if no resources
  const resourcesItems = resources.length > 0 ? resources : [];

  const [autoplayPlugin] = useState(() =>
    Autoplay({
      delay: 4000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
      stopOnFocusIn: false,
    })
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: "start",
      slidesToScroll: 1,
      containScroll: "trimSnaps",
      dragFree: false,
      loop: false,
    },
    [autoplayPlugin]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const scrollTo = useCallback(
    (index) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    // Get the selected scroll snap index (first visible slide index)
    const snapIndex = emblaApi.selectedScrollSnap();
    setSelectedIndex(snapIndex);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div
      className={`${styles.resources} ${showAll ? styles.resources_all : ""}`}
    >
      <Container>
        <motion.h2
          className={`${styles.resources_title} title`}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <span className="title-accent">Resources</span>
        </motion.h2>

        <motion.div
          className={styles.resources_items_wrapper}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {resourcesItems.length > 0 ? (
            <div className={styles.resources_carousel_wrapper}>
              <div className={styles.resources_carousel} ref={emblaRef}>
                <div className={styles.resources_slider}>
                  {resourcesItems.map((item, index) => (
                    <div
                      key={item.id || index}
                      className={styles.resources_slide}
                    >
                      <Link
                        href={`/publications/${item.slug}`}
                        className={styles.resources_item}
                      >
                        <div className={styles.resources_item_image}>
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            style={{ objectFit: "cover" }}
                          />
                        </div>
                        <div className={styles.resources_item_text}>
                          <p className={styles.resources_item_type}>
                            {item.type}
                          </p>
                          <h6 className={styles.resources_item_title}>
                            {item.title}
                          </h6>
                          <p className={styles.resources_item_excerpt}>
                            {item.excerpt}
                          </p>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
              {resourcesItems.length > 1 && (
                <div className={styles.resources_carousel_pagination}>
                  {resourcesItems.map((_, index) => (
                    <button
                      key={index}
                      className={`${styles.resources_carousel_dot} ${
                        index === selectedIndex
                          ? styles.resources_carousel_dot_active
                          : ""
                      }`}
                      onClick={() => scrollTo(index)}
                      aria-label={`Go to slide ${index + 1}`}
                      aria-current={index === selectedIndex ? "true" : "false"}
                    />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div>
              <p>No resources available at the moment.</p>
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
            className={styles.resources_button_container}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Button
              href="/our-work/publications"
              className={styles.resources_button}
            >
              Discover More{" "}
              <IoIosArrowForward className={styles.resources_button_icon} />
            </Button>
          </motion.div>
        )}
      </Container>
    </div>
  );
};

export default Resources;
