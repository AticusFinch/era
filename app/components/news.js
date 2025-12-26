"use client";

import styles from "./news.module.css";
import Container from "@/app/components/container";
import Image from "next/image";
import Link from "next/link";
import Button from "@/app/components/button";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { IoReaderOutline } from "react-icons/io5";
import { CiCalendarDate } from "react-icons/ci";

const News = ({ newsItems = [], debugInfo = null }) => {
  const newsItemsList = newsItems.length > 0 ? newsItems : [];
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <div className={styles.news}>
      <Container>
        <div className={styles.news_container}>
          <div className={styles.news_left}>
            <motion.h2
              className={`${styles.news_title} title`}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span className="title-accent">Latest News</span>
            </motion.h2>
            <p className={styles.news_description}>
              Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque
              faucibus ex sapien vitae pellentesque sem placerat. In id cursus
              mi pretium tellus duis convallis. Tempus leo eu aenean sed diam
              urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum
              egestas.
            </p>
          </div>
          <motion.div
            className={styles.news_items_wrapper}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {newsItemsList.length > 0 ? (
              <div className={styles.news_list}>
                {newsItemsList.map((item, index) => (
                  <motion.div
                    key={item.id || index}
                    className={styles.news_item_wrapper}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
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
                        <h6 className={styles.news_item_title}>{item.title}</h6>
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
                ))}
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
        </div>
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
