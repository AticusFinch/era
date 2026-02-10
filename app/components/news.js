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

const MAX_LIST_ITEMS = 4;

const News = ({ newsItems = [], debugInfo = null }) => {
  const newsItemsList = newsItems.length > 0 ? newsItems : [];
  const featuredItem = newsItemsList[0] ?? null;
  const listItems = newsItemsList.slice(1, 1 + MAX_LIST_ITEMS);

  return (
    <div className={styles.news}>
      <Container>
        <div className={styles.news_container}>
          <div className={styles.news_header}>
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

          {newsItemsList.length > 0 ? (
            <div className={styles.news_carousel}>
              <div className={styles.news_carousel_left}>
                <Link
                  href={featuredItem ? `/news/${featuredItem.slug}` : "/news"}
                  className={styles.news_featured}
                  aria-label={featuredItem?.title}
                >
                  <div className={styles.news_featured_image}>
                    <Image
                      src={featuredItem?.image ?? "/img/hero/hero.png"}
                      alt={featuredItem?.title ?? ""}
                      fill
                      sizes="(min-width: 1024px) 60vw, 100vw"
                      style={{ objectFit: "cover" }}
                      priority
                    />
                    <div className={styles.news_featured_overlay} />
                  </div>
                  <div className={styles.news_featured_text}>
                    <span className={styles.news_featured_category}>
                      {featuredItem?.category}
                    </span>
                    <h3 className={styles.news_featured_title}>
                      {featuredItem?.title}
                    </h3>
                    <div className={styles.news_featured_info}>
                      <span className={styles.news_featured_date}>
                        <CiCalendarDate />
                        {featuredItem?.date}
                      </span>
                      <span className={styles.news_featured_readingTime}>
                        <IoReaderOutline />
                        {featuredItem?.readingTime}
                      </span>
                    </div>
                  </div>
                </Link>
              </div>

              {listItems.length > 0 && (
                <div className={styles.news_carousel_right}>
                  {listItems.map((item, index) => (
                    <Link
                      key={item.id || index}
                      href={`/news/${item.slug}`}
                      className={styles.news_list_item_wrapper}
                      aria-label={`Read ${item.title}`}
                    >
                      <div className={styles.news_list_item}>
                        <div className={styles.news_list_item_image}>
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            sizes="120px"
                            style={{ objectFit: "cover" }}
                          />
                        </div>
                        <div className={styles.news_list_item_text}>
                          <span className={styles.news_list_item_category}>
                            {item.category}
                          </span>
                          <h6 className={styles.news_list_item_title}>
                            {item.title}
                          </h6>
                          <div className={styles.news_list_item_info}>
                            <span>
                              <CiCalendarDate />
                              {item.date}
                            </span>
                            <span>
                              <IoReaderOutline />
                              {item.readingTime}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
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

          <motion.div
            className={styles.news_button_container}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Button href="/news" className={styles.news_button}>
              Read More{" "}
              <IoIosArrowForward className={styles.news_button_icon} />
            </Button>
          </motion.div>
        </div>
      </Container>
    </div>
  );
};

export default News;
