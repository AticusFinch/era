"use client";

import { motion } from "framer-motion";
import { MdOutlineNewspaper } from "react-icons/md";
import NewsList from "./news-list";
import styles from "./page.module.css";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5, ease: "easeOut" },
};

export default function NewsView({ items = [] }) {
  return (
    <main className={styles.news_page}>
      <header className={styles.news_hero}>
        <motion.div {...fadeUp}>
          <p className={styles.news_kicker}>
            <MdOutlineNewspaper aria-hidden />
            Updates &amp; stories
          </p>
          <h1 className={styles.news_title}>
            <span className="title-accent">News</span>
          </h1>
          <p className={styles.news_intro}>
            Browse ERA news, statements, and regional updates — advocacy
            milestones, event highlights, and perspectives from across the
            Western Balkans and Türkiye.
          </p>
        </motion.div>
      </header>

      {items.length > 0 ? (
        <NewsList items={items} />
      ) : (
        <p className={styles.news_empty}>No news available at the moment.</p>
      )}
    </main>
  );
}
