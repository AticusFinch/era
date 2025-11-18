"use client";

import styles from "./news.module.css";
import Container from "@/app/components/container";
import Image from "next/image";
import Link from "next/link";
import Button from "@/app/components/button";
import { motion } from "framer-motion";

import { IoIosArrowForward } from "react-icons/io";
import { IoReaderOutline } from "react-icons/io5";
import { CiCalendarDate } from "react-icons/ci";

const News = ({ newsItems = [], debugInfo = null }) => {
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
          className={styles.news_items}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {newsItems.length > 0 ? (
            newsItems.map((item) => (
              <Link
                href={`/news/${item.slug}`}
                key={item.id}
                className={styles.news_item}
              >
                <div className={`${styles.news_item_text} text`}>
                  <span className={styles.news_item_category}>
                    {item.category}
                  </span>
                  <div className={styles.news_item_title_wrapper}>
                    <h3 className={styles.news_item_title}>{item.title}</h3>
                  </div>
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
                <div className={styles.news_item_image}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={4000}
                    height={6000}
                  />
                </div>
              </Link>
            ))
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
