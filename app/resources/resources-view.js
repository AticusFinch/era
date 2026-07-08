"use client";

import { motion } from "framer-motion";
import ResourcesList from "./resources-list";
import styles from "./page.module.css";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5, ease: "easeOut" },
};

export default function ResourcesView({ resources = [], filterOptions = {} }) {
  return (
    <div className={styles.resources_container}>
      <motion.header className={styles.resources_header} {...fadeUp}>
        <h1 className={styles.resources_title}>
          <span className="title-accent">Resources</span>
        </h1>
      </motion.header>

      <ResourcesList resources={resources} filterOptions={filterOptions} />
    </div>
  );
}
