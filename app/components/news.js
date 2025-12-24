"use client";

import styles from "./news.module.css";
import Container from "@/app/components/container";
import Image from "next/image";
import Link from "next/link";
import Button from "@/app/components/button";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useState, useCallback } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { IoReaderOutline } from "react-icons/io5";
import { CiCalendarDate } from "react-icons/ci";

const News = ({ newsItems = [], debugInfo = null }) => {
  const newsItemsList = newsItems.length > 0 ? newsItems : [];

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
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const scrollTo = useCallback(
    (index) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
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
    <div className={styles.news}>
      <Container>
        <motion.h2
          className={`${styles.news_title} title`}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <span className="title-accent">News</span>
        </motion.h2>
        <motion.div
          className={styles.news_items_wrapper}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {newsItemsList.length > 0 ? (
            <div className={styles.news_carousel_wrapper}>
              <div className={styles.news_carousel} ref={emblaRef}>
                <div className={styles.news_slider}>
                  {newsItemsList.map((item, index) => (
                    <div key={item.id || index} className={styles.news_slide}>
                      <motion.div
                        className={styles.news_item_wrapper}
                        {...(isDesktop && {
                          whileHover: {
                            y: -5,
                            scale: 1.02,
                            boxShadow: "0 8px 24px 0 rgba(0, 0, 0, 0.12)",
                            transition: {
                              type: "spring",
                              stiffness: 600,
                              damping: 35,
                              mass: 0.5,
                            },
                          },
                          transition: {
                            type: "spring",
                            stiffness: 600,
                            damping: 35,
                            mass: 0.5,
                          },
                        })}
                      >
                        <Link
                          href={`/news/${item.slug}`}
                          className={styles.news_item}
                        >
                          <div className={styles.news_item_image}>
                            <Image
                              src={item.image}
                              alt={item.title}
                              fill
                              style={{ objectFit: "cover" }}
                            />
                          </div>
                          <div className={`${styles.news_item_text} text`}>
                            <span className={styles.news_item_category}>
                              {item.category}
                            </span>
                            <h6 className={styles.news_item_title}>
                              {item.title}
                            </h6>
                            {item.excerpt && (
                              <p className={styles.news_item_excerpt}>
                                {item.excerpt}
                              </p>
                            )}
                            <div className={styles.news_item_info}>
                              <span className={styles.news_item_date}>
                                <CiCalendarDate />
                                {item.date}
                              </span>
                              <span className={styles.news_item_readingTime}>
                                <IoReaderOutline />
                                {item.readingTime}
                              </span>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    </div>
                  ))}
                </div>
              </div>
              {newsItemsList.length > 1 && (
                <div className={styles.news_carousel_pagination}>
                  {newsItemsList.map((_, index) => (
                    <button
                      key={index}
                      className={`${styles.news_carousel_dot} ${
                        index === selectedIndex
                          ? styles.news_carousel_dot_active
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
            <div className={styles.news_empty}>
              <p>No news available at the moment.</p>
              {debugInfo && (
                <div
                  style={{
                    marginTop: "1rem",
                    fontSize: "0.875rem",
                    color: "#666",
                  }}
                >
                  <pre>{JSON.stringify(debugInfo, null, 2)}</pre>
                </div>
              )}
            </div>
          )}
        </motion.div>
        <motion.div
          className={styles.news_button_container}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Button href="/news" className={styles.news_button}>
            Read More <IoIosArrowForward className={styles.news_button_icon} />
          </Button>
        </motion.div>
      </Container>
    </div>
  );
};

export default News;
