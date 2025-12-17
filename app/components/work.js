"use client";
import styles from "./work.module.css";
import Container from "@/app/components/container";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const Work = () => {
  return (
    <div className={styles.work}>
      <Container>
        <div className={styles.work_container}>
          <div className={styles.work_text}>
            <motion.h2
              className={`${styles.work_title} title`}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span className="title-accent">Our Work</span>
            </motion.h2>
            <motion.p
              className={`${styles.work_subtitle} text`}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque
              faucibus ex sapien vitae pellentesque sem placerat. In id cursus
              mi pretium tellus duis convallis. Tempus leo eu aenean sed diam
              urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum
              egestas.
            </motion.p>
          </div>
          <div className={styles.work_links}>
            <motion.div
              className={styles.work_link}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <Link href="/our-work/projects">
                <h5>Projects</h5>
              </Link>
            </motion.div>
            <motion.div
              className={styles.work_link}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <Link href="/our-work/publications">
                <h5>Training Hub</h5>
              </Link>
            </motion.div>
            <motion.div
              className={styles.work_link}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <Link href="/our-work/publications">
                <h5>WLW & TNBI Caucuses</h5>
              </Link>
            </motion.div>
            <motion.div
              className={styles.work_link}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <Link href="/our-work/publications">
                <h5>Community Support</h5>
              </Link>
            </motion.div>
            <motion.div
              className={styles.work_link}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <Link href="/our-work/publications">
                <h5>Advocacy</h5>
              </Link>
            </motion.div>
            <motion.div
              className={styles.work_link}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <Link href="/our-work/publications">
                <h5>Research</h5>
              </Link>
            </motion.div>
            <motion.div
              className={styles.work_link}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <Link href="/our-work/publications">
                <h5>Events</h5>
              </Link>
            </motion.div>
          </div>
        </div>
      </Container>
      <div className={styles.work_images}>
        <div className={styles.work_image_container}>
          <Image
            src="/img/hero/lgbt.jpg"
            alt="Our Work"
            width={1000}
            height={1000}
            priority
          />
        </div>
        <div className={styles.work_image_container}>
          <Image
            src="/img/hero/lgbt.jpg"
            alt="Our Work"
            width={1000}
            height={1000}
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default Work;
