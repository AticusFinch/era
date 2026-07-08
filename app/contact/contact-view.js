"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MdEmail } from "react-icons/md";
import ContactForm from "./contact-form";
import styles from "./page.module.css";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5, ease: "easeOut" },
};

const asideStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
};

const asideItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

export default function ContactView() {
  return (
    <main className={styles.contact_page}>
      <motion.header className={styles.contact_header} {...fadeUp}>
        <h1 className={styles.contact_title}>
          <span className="title-accent">Contact</span>
        </h1>
        <p className={styles.contact_intro}>
          Whether you have a question about our work, want to explore a
          partnership, or need to reach our team, we would love to hear from
          you. Fill out the form and we will respond as soon as we can.
        </p>
      </motion.header>

      <div className={styles.contact_layout}>
        <motion.aside
          className={styles.contact_aside}
          variants={asideStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
        >
          <motion.div
            className={styles.contact_info_card}
            variants={asideItem}
          >
            <p className={styles.contact_info_label}>Email</p>
            <p className={styles.contact_info_text}>
              For direct correspondence, you can reach us at:
            </p>
            <Link
              href="mailto:office@lgbti-era.org"
              className={styles.contact_email_link}
            >
              <MdEmail aria-hidden />
              office@lgbti-era.org
            </Link>
          </motion.div>

          <motion.div
            className={styles.contact_info_card}
            variants={asideItem}
          >
            <p className={styles.contact_info_label}>Response time</p>
            <p className={styles.contact_info_text}>
              We aim to reply to all inquiries within a few business days. Thank
              you for your patience.
            </p>
          </motion.div>
        </motion.aside>

        <ContactForm />
      </div>
    </main>
  );
}
