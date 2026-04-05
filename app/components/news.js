"use client";

import styles from "./news.module.css";
import Container from "@/app/components/container";
import Image from "next/image";
import Link from "next/link";
import Button from "@/app/components/button";
import { motion, useReducedMotion } from "framer-motion";
import { IoReaderOutline } from "react-icons/io5";
import { CiCalendarDate } from "react-icons/ci";

const MAX_LIST_ITEMS = 3;

function getFadeUpVariants(y) {
  return {
    hidden: { opacity: 0, y },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  };
}

const listContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
};

const listItemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeInOut" },
  },
};

const carouselVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.16, delayChildren: 0.06 },
  },
};

const News = ({ newsItems = [], debugInfo = null }) => {
  const prefersReducedMotion = useReducedMotion();
  const y = prefersReducedMotion ? 0 : 24;
  const fadeUp = getFadeUpVariants(y);
  const featuredVariants = prefersReducedMotion
    ? fadeUp
    : {
        hidden: { opacity: 0, y: 32 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.55, ease: "easeInOut" },
        },
      };

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
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "0px 0px -12% 0px" }}
            >
              <span className="title-accent">Latest News</span>
            </motion.h2>
            <motion.p
              className={styles.news_description}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "0px 0px -12% 0px" }}
              transition={{ delay: 0.08 }}
            >
              Discover ERA’s latest actions and developments advancing and
              strengthening LGBTI rights and equality across the region. Stay
              informed about our programmes, regional advocacy, initiatives,
              policy engagement, and cross-border civil society cooperation in
              the Western Balkans, Türkiye, Europe, and beyond.
            </motion.p>
          </div>

          {newsItemsList.length > 0 ? (
            <motion.div
              className={styles.news_carousel}
              variants={carouselVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "0px 0px -8% 0px" }}
            >
              <motion.div
                className={styles.news_carousel_left}
                variants={featuredVariants}
              >
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
                    <p className={styles.news_featured_excerpt}>
                      {featuredItem?.excerpt}
                    </p>
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
              </motion.div>

              {listItems.length > 0 && (
                <motion.div
                  className={styles.news_carousel_right}
                  variants={listContainerVariants}
                >
                  {listItems.map((item, index) => (
                    <motion.div
                      key={item.id || index}
                      className={styles.news_list_item_outer}
                      variants={listItemVariants}
                    >
                      <Link
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
                            <p className={styles.news_list_item_excerpt}>
                              {item.excerpt}
                            </p>
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
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </motion.div>
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
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ delay: 0.12 }}
          >
            <Button href="/news" className={styles.news_button}>
              Read More
            </Button>
          </motion.div>
        </div>
      </Container>
    </div>
  );
};

export default News;
